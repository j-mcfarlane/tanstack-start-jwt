import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    component: () => {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <div className="flex gap-10">
                    <Link to="/login">Login</Link>
                    <Link to="/dashboard">Dashboard</Link>
                </div>
            </div>
        )
    },
})
