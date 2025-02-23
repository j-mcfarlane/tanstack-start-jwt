import { createServerFn } from '@tanstack/start'
import { setCookie } from '@tanstack/start/server'

// Axios
import { useAxios } from '@/app/lib/utils/http'

export const loginFn = createServerFn({ method: 'POST' })
    .validator((d: { email: string; password: string }) => d as { email: string; password: string })
    .handler(async ({ data }) => {
        const { http } = useAxios()

        const response = await http.post<{
            success: boolean
            data: {
                access: string
                refresh: string
            }
        }>('/authentication/login', data)

        setCookie('access', response.data.data.access)
        setCookie('refresh', response.data.data.refresh)

        return {
            ...response.data, // Returns the cookie response
        }
    })
