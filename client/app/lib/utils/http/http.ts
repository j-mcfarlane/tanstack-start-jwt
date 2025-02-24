import axios, { AxiosInstance } from 'axios'
import { useAppSession } from '../session/session'
import { redirect } from '@tanstack/react-router'
import { deleteCookie } from '@tanstack/start/server'

export async function useAxios() {
    const http = async (): Promise<AxiosInstance> => {
        const session = await useAppSession()

        const access = session.data?.access || null
        const refresh = session.data?.refresh || null

        const instance = axios.create({
            baseURL: process.env.BACKEND_URL,
            headers: {
                Authorization: `Bearer ${access}`,
            },
        })

        instance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config

                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true

                    try {
                        const refreshResponse = await axios.post(
                            `${process.env.BACKEND_URL}/authentication/refresh`,
                            {},
                            {
                                headers: {
                                    Authorization: `Bearer ${refresh}`,
                                },
                            },
                        )

                        // Extract new tokens
                        const newAccess = refreshResponse.data.data.access
                        const newRefresh = refreshResponse.data.data.refresh

                        // Update session
                        const session = await useAppSession()
                        await session.update({
                            access: newAccess,
                            refresh: newRefresh,
                        })

                        // Update instance default header for subsequent requests
                        instance.defaults.headers.common['Authorization'] = `Bearer ${newAccess}`

                        // Update the header for the original request
                        originalRequest.headers['Authorization'] = `Bearer ${newAccess}`

                        return instance(originalRequest)
                    } catch (refreshError) {
                        await session.clear()
                        deleteCookie(process.env.AUTH_SESSION_NAME!)

                        throw redirect({
                            to: '/login',
                        })
                    }
                }
                await session.clear()
                deleteCookie(process.env.AUTH_SESSION_NAME!)

                throw redirect({
                    to: '/login',
                })
            },
        )

        return instance
    }

    return {
        http: await http(),
    }
}
