import { HeadContent, Scripts } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export function RootDocument({ children }: { children: React.ReactNode }) {
    return (
        <html suppressHydrationWarning>
            <head>
                <HeadContent />
            </head>
            <body lang="en">
                {children}

                <TanStackRouterDevtools position="bottom-right" />
                <Scripts />
            </body>
        </html>
    )
}
