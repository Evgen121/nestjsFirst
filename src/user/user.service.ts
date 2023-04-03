import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './modeles/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto';
import { AppError } from './../app/common/errors';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private readonly userRespositpry: typeof User) { }

    async hashPassword(password) {
        return bcrypt.hash(password, 10)
    }
    async findUserByEmail(email: string) {
        return this.userRespositpry.findOne({ where: { email } })
    }


    async createUsers(dto: CreateUserDto): Promise<CreateUserDto> {
        const existUser = await this.findUserByEmail(dto.email)
        if (existUser) {
            throw new BadRequestException(AppError.USER_EXIST)
        }
        dto.password = await this.hashPassword(dto.password)

        await this.userRespositpry.create({
            username: dto.username,
            email: dto.email,
            password: dto.password,
        })
        return dto

    }
}
