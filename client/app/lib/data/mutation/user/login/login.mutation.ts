import { useMutation } from '@tanstack/react-query'

// Server Fn
import { loginFn } from './login.server'

export function loginMutation() {
    return useMutation<{ data: { access: string; refresh: string } }, null, { email: string; password: string }>({
        mutationKey: ['login'],
        mutationFn: (data: { email: string; password: string }) => loginFn({ data }),
        retry: false,
    })
}
