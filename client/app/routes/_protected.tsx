import { createFileRoute, redirect } from '@tanstack/react-router'

// Layout
import { DashboardLayout } from '@/app/lib/layouts/DashboardLayout'

export const Route = createFileRoute('/_protected')({
    beforeLoad: ({ context }) => {
        if (!context.auth?.authenticated) {
            throw redirect({
                to: '/login',
            })
        }
    },
    component: DashboardLayout,
})
