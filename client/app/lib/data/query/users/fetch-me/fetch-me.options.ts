import { queryOptions } from '@tanstack/react-query'
import { fetchMe } from './fetch-me.server'
import ms from 'ms'

export const meQueryOptions = () =>
    queryOptions({
        queryKey: ['users', 'me'],
        queryFn: () => fetchMe(),
        staleTime: ms('10m'),
    })
