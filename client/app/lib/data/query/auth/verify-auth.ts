import { createServerFn } from '@tanstack/start'
import { getCookie } from '@tanstack/start/server'

// Data
import { Auth } from '@/app/lib/schema/auth'
import { fetchMe } from '../users/fetch-me'

export const verifyAuth = createServerFn({ method: 'GET' }).handler<Auth>(async () => {
    const access = getCookie('access')

    if (!access) {
        console.log('No cookie found, redirecting to login')
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
