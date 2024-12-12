import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { UsersService } from 'src/modules/users/services/users.service';
export interface JwtPayload {
  accessToken: string;
  username: string;
  id: string;
  roles: string[];
}
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async onModuleInit() {
    const res = await this.usersService.findAll();
    if (res.length === 0) {
      const users = [
        {
          name: 'John Doe',
          email: 'john.doe@example.com',
          password: 'password123',
          roles: ['admin'],
          phone: '123456789',
          address: '1234 Main St',
          CEP: '12345678',
        },
        {
          name: 'Jane Doe',
          email: 'john.doe2@example.com',
          password: 'password123',
          roles: ['user'],
          phone: '123456789',
          address: '1234 Main St',
          CEP: '12345678',
        },
        {
          name: 'Jane Doe',
          email: 'john.doe3@example.com',
          password: 'password123',
          roles: ['user'],
          phone: '123456789',
          address: '1234 Main St',
          CEP: '12345678',
        },
        {
          name: 'Jane Doe',
          email: 'john.doe4@example.com',
          password: 'password123',
          roles: ['user'],
          phone: '123456789',
          address: '1234 Main St',
          CEP: '12345678',
        },
      ] as CreateUserDto[];
      users.forEach(async (user) => {
        try {
          await this.usersService.create(user);
        } catch (error) {
          console.error(error);
        }
      });
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user.toObject();
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any): Promise<JwtPayload> {
    const payload = { username: user.name, sub: user._id, roles: user.roles };
    return {
      accessToken: this.jwtService.sign(payload),
      username: user.name,
      roles: user.roles,
      id: user._id,
    } as JwtPayload;
  }
}
