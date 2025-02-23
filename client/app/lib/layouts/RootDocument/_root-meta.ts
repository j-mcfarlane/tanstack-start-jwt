import { seo } from '@/app/lib/utils/seo'

export const RootMeta: React.DetailedHTMLProps<React.MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>[] = [
    {
        charSet: 'utf-8',
    },
    {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
    },
    ...seo({
        title: 'Learning | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
    }),
]
