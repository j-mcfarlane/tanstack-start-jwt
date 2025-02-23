import z from 'zod'

export const AuthSchema = z.object({
    authenticated: z.boolean(),
    user: z
        .object({
            id: z.string(),
            email: z.string(),
        })
        .nullable(),
})

export type Auth = z.infer<typeof AuthSchema>
