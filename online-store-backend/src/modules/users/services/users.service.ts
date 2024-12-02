import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create(data: CreateUserDto): Promise<User> {
        const user = new this.userModel(data);
        return user.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOne(id: string): Promise<User> {
        return this.userModel.findById(id).exec();
    }

    async update(id: string, data: UpdateUserDto): Promise<User> {
        return this.userModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    // async delete(id: string): Promise<User> {
    //     return this.userModel.findByIdAndRemove(id).exec();
    // }
}
