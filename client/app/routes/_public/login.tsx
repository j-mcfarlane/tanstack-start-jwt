import { createFileRoute } from '@tanstack/react-router'

// Container
import { LoginContainer } from '@/app/lib/containers/LoginContainer'

export const Route = createFileRoute('/_public/login')({
    component: LoginContainer,
})
