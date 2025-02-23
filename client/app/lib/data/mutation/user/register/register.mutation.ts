import { useMutation } from '@tanstack/react-query'

// Server Fn
import { registerFn } from './register.server'

export function registerMutation() {
    return useMutation<{ data: { access: string; refresh: string } }, null, { email: string; password: string }>({
        mutationKey: ['register'],
        mutationFn: (data: { email: string; password: string }) => registerFn({ data }),
        retry: false,
    })
}
