import { createServerFn } from '@tanstack/start'

// Axios
import { useAxios } from '@/app/lib/utils/http'
import { useAppSession } from '@/app/lib/utils/session/session'

export const loginFn = createServerFn({ method: 'POST' })
    .validator((d: { email: string; password: string }) => d as { email: string; password: string })
    .handler(async ({ data }) => {
        const { http } = await useAxios()

        const response = await http.post<{
            success: boolean
            data: {
                access: string
                refresh: string
            }
        }>('/authentication/login', data)

        const session = await useAppSession()
        await session.update({
            access: response.data.data.access,
            refresh: response.data.data.refresh,
        })

        return {
            ...response.data, // Returns the cookie response
        }
    })
