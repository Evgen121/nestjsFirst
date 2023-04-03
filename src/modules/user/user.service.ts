import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './modeles/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto';


@Injectable()
export class UserService {
    constructor(@InjectModel(User) private readonly userRespository: typeof User) { }

    async hashPassword(password) {
        return bcrypt.hash(password, 10)
    }
    async findUserByEmail(email: string) {
        return this.userRespository.findOne({ where: { email } })
    }


    async createUsers(dto: CreateUserDto): Promise<CreateUserDto> {
        dto.password = await this.hashPassword(dto.password)
        await this.userRespository.create({
            username: dto.username,
            email: dto.email,
            password: dto.password,
        })
        return dto

    }
}
