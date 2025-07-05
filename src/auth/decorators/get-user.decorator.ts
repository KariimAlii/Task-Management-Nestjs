import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../tasks/entities/user.entity';

export const GetUser = createParamDecorator(
  (data, context: ExecutionContext): User => {
    const requestBody = context.switchToHttp().getRequest();
    return requestBody.user;
  }
)