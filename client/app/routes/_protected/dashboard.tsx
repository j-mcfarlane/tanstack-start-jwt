import { createFileRoute } from '@tanstack/react-router'

// Container
import { DashboardContainer } from '@/app/lib/containers/DashboardContainer'

export const Route = createFileRoute('/_protected/dashboard')({
    component: DashboardContainer,
})
