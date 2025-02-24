import { createServerFn } from '@tanstack/start'
import { Auth } from '@/app/lib/schema/auth'
import { fetchMe } from '../users/fetch-me'
import { useAppSession } from '@/app/lib/utils/session'
import { deleteCookie } from '@tanstack/start/server'

export const verifyAuth = createServerFn({ method: 'GET' }).handler<Auth>(async () => {
    const session = await useAppSession()

    if (!session.data?.access) {
        console.log('No access token found, redirecting to login')

        await session.clear()
        deleteCookie(process.env.AUTH_SESSION_NAME!)

        return {
            authenticated: false,
            user: null,
        }
    }

    const user = await fetchMe()

    if (user) {
        return {
            authenticated: true,
            user: {
                id: user.id.toString(),
                email: user.email,
            },
        }
    }

    return {
        authenticated: false,
        user: null,
    }
})
