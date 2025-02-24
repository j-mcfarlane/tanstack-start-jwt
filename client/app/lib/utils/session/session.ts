import { useSession } from '@tanstack/start/server'

type SessionUser = {
    access: string
    refresh: string
}

export function useAppSession() {
    return useSession<SessionUser>({
        name: process.env.AUTH_SESSION_NAME,
        password: process.env.SESSION_SECRET!,
        cookie: {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        },
    })
}
