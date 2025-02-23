import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_public')({
    beforeLoad: ({ context }) => {
        if (context.auth?.authenticated) {
            throw redirect({
                to: '/dashboard',
            })
        }
    },
})
