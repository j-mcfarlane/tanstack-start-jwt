import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { QueryClient } from '@tanstack/react-query'

// Root
import { RootLinks } from '@/app/lib/layouts/RootDocument/_root-links'
import { RootMeta } from '@/app/lib/layouts/RootDocument/_root-meta'
import { RootDocument } from '@/app/lib/layouts/RootDocument/RootDocument'

// Containers
import { NotFoundContainer } from '@/app/lib/containers/NotFoundContainer'
import { DefaultCatchBoundaryContainer } from '@/app/lib/containers/DefaultCatchBoundaryContainer'

// Types
import { Auth } from '@/app/lib/schema/auth'

// Data
import { verifyAuth } from '@/app/lib/data/query/auth/verify-auth'

export const Route = createRootRouteWithContext<{
    auth: Auth
    queryClient: QueryClient
}>()({
    beforeLoad: async () => {
        const auth = await verifyAuth()

        return {
            auth,
        }
    },
    head: () => ({
        meta: RootMeta,
        links: RootLinks,
    }),
    errorComponent: (props) => {
        return (
            <RootDocument>
                <DefaultCatchBoundaryContainer {...props} />
            </RootDocument>
        )
    },
    notFoundComponent: () => <NotFoundContainer />,
    component: () => {
        return (
            <RootDocument>
                <Outlet />
            </RootDocument>
        )
    },
})
