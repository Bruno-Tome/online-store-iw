import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/modules/users/services/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user.toObject();
            return result;
        }
        throw new UnauthorizedException('Invalid credentials');
    }

    async login(user: any): Promise<{
        accessToken: string,
        username: string,
        roles: string[],
        sub: string
    }> {
        const payload = { username: user.name, sub: user._id, roles: user.roles };
        return {
            accessToken: this.jwtService.sign(payload),
            username: user.name,
            roles: user.roles,
            sub: user._id
        };
    }
    
}
