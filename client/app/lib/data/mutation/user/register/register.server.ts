import { createServerFn } from '@tanstack/start'
import { useAxios } from '@/app/lib/utils/http'
import { useAppSession } from '@/app/lib/utils/session'

export const registerFn = createServerFn({ method: 'POST' })
    .validator((d: { email: string; password: string }) => d as { email: string; password: string })
    .handler(async ({ data }) => {
        const { http } = await useAxios()

        const response = await http.post<{
            success: boolean
            data: {
                access: string
                refresh: string
            }
        }>('/authentication/register', data)

        const session = await useAppSession()
        await session.update({
            access: response.data.data.access,
            refresh: response.data.data.refresh,
        })

        return {
            ...response.data,
        }
    })
