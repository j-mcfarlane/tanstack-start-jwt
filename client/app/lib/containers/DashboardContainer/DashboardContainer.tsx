import { useRouteContext } from '@tanstack/react-router'

export function DashboardContainer() {
    const context = useRouteContext({
        from: '/_protected/dashboard',
    })

    return (
        <div className="space-y-4 max-w-2xl mx-auto overflow-auto">
            <h1>Dashboar Container</h1>
            <pre>{JSON.stringify(context.auth, null, 2)}</pre>
        </div>
    )
}
