import { createFileRoute } from '@tanstack/react-router'

// Container
import { RegisterContainer } from '@/app/lib/containers/RegisterContainer'

export const Route = createFileRoute('/_public/register')({
    component: RegisterContainer,
})
