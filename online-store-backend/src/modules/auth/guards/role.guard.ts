import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return true; // No roles required for this route
        }

        const { user } = context.switchToHttp().getRequest();
        if (!user || !user.roles || !requiredRoles.some(role => user.roles.includes(role))) {
            throw new ForbiddenException('You do not have the required permissions.');
        }

        return true;
    }
}
