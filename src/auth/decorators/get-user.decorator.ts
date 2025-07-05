import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../tasks/entities/user.entity';

export const GetUser = createParamDecorator(
  (data, context: ExecutionContext): User => {
    const requestBody = context.switchToHttp().getRequest();
    return requestBody.user;
  }
)

// you cannot directly use @GetUser() inside a service,
// because it's a decorator tied to the controller layer,
// and it depends on the ExecutionContext,
// which only exists in request lifecycle methods like controllers or guards.