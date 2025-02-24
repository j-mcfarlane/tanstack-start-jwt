import { User } from '@/app/lib/types'
import { notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start'
import { useAxios } from '@/app/lib/utils/http'
import { useAppSession } from '@/app/lib/utils/session/session'
export const fetchMe = createServerFn({ method: 'GET' }).handler<User>(async () => {
    const { http } = await useAxios()
    const session = await useAppSession()

    const res = await http
        .get(`/users/me`, {
            headers: {
                Authorization: `Bearer ${session.data?.access}`,
            },
        })
        .then((r) => r.data)
        .catch((err) => {
            if (err.status === 404) {
                throw notFound()
            }

            throw err
        })

    return {
        id: res.data._id.toString(),
        email: res.data.email,
    }
})
