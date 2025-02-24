import { createServerFn } from '@tanstack/start'

// Axios
import { useAxios } from '@/app/lib/utils/http'
import { useAppSession } from '@/app/lib/utils/session'
export const logoutFn = createServerFn({ method: 'POST' }).handler(async () => {
    const { http } = await useAxios()

    await http.post<{
        success: boolean
        data: {
            access: string
            refresh: string
        }
    }>('/authentication/logout', {})

    const session = await useAppSession()
    await session.clear()

    return {
        success: true,
    }
})
