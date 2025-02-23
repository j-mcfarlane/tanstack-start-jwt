import { useMutation } from '@tanstack/react-query'

// Server Fn
import { logoutFn } from './logout.server'

export function logoutMutation() {
    return useMutation<{ success: boolean }, unknown, null>({
        mutationKey: ['logout'],
        mutationFn: () => logoutFn(),
        retry: false,
    })
}
