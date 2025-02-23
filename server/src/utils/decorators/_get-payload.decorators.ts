import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const GetPayload = createParamDecorator((_: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest()

    return request.user
})
