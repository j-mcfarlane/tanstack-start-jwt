import { createServerFn } from '@tanstack/start'
import { deleteCookie } from '@tanstack/start/server'

// Axios
import { useAxios } from '@/app/lib/utils/http'

export const logoutFn = createServerFn({ method: 'POST' }).handler(async () => {
    const { http } = useAxios()

    await http.post<{
        success: boolean
        data: {
            access: string
            refresh: string
        }
    }>('/authentication/logout', {})

    deleteCookie('access')
    deleteCookie('refresh')

    return {
        success: true,
    }
})
