import { Module } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './controllers/users.controller';
import { User, UserSchema } from './schemas/user.schema';
import { UsersService } from './services/users.service';
import { get } from 'mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [UsersController],
    providers: [UsersService,
        // {provide: UsersService,
        //     useValue: User,
        // }
    ],
    exports: [UsersService],
})
export class UsersModule {}
