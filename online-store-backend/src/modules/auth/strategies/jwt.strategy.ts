import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'your_jwt_secret_key', // Use environment variable in production
        });
    }

    async validate(payload: any) {
        // Attach roles and other user information from the payload
        return { userId: payload.sub, username: payload.username, roles: payload.roles };
    }
}
