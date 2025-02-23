import axios, { AxiosInstance } from 'axios'
import { getCookie, setCookie } from '@tanstack/start/server'
import ms from 'ms'

export function useAxios() {
    const http = (): AxiosInstance => {
        const access = getCookie('access') || null
        const refresh = getCookie('refresh') || null

        const instance = axios.create({
            baseURL: `http://localhost:7588`,
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
                            `http://localhost:7588/authentication/refresh`,
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

                        // Update cookies with the new tokens
                        setCookie('access', newAccess, {
                            maxAge: ms('10m'),
                            path: '/',
                        })
                        setCookie('refresh', newRefresh, {
                            maxAge: ms('7d'),
                            path: '/',
                        })

                        // Update instance default header for subsequent requests
                        instance.defaults.headers.common['Authorization'] = `Bearer ${newAccess}`

                        // Update the header for the original request
                        originalRequest.headers['Authorization'] = `Bearer ${newAccess}`

                        return instance(originalRequest)
                    } catch (refreshError) {
                        return Promise.reject(refreshError)
                    }
                }

                return Promise.reject(error)
            },
        )

        return instance
    }

    return {
        http: http(),
    }
}
