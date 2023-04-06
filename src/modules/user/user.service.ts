import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from './modeles/user.model'
import * as bcrypt from 'bcrypt'
import { Watchlist } from '../watchlist/models/watchlist.model'
import { CreateUserDto, UpdateUserDto } from './dto/indexDto'

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User) private readonly userRespository: typeof User,
	) {}

	async hashPassword(password: string): Promise<string> {
		try {
			return bcrypt.hash(password, 10)
		} catch (err) {
			throw new Error(err)
		}
	}
	async findUserByEmail(email: string): Promise<User> {
		try {
			return this.userRespository.findOne({ where: { email } })
		} catch (err) {
			throw new Error(err)
		}
	}

	async createUsers(dto: CreateUserDto): Promise<CreateUserDto> {
		try {
			dto.password = await this.hashPassword(dto.password)
			await this.userRespository.create({
				username: dto.username,
				email: dto.email,
				password: dto.password,
			})
			return dto
		} catch (err) {
			throw new Error(err)
		}
	}
	async publicUser(email: string): Promise<User> {
		try {
			return this.userRespository.findOne({
				where: { email },
				attributes: { exclude: ['password'] },
				include: {
					model: Watchlist,
					required: false,
				},
			})
		} catch (err) {
			throw new Error(err)
		}
	}
	async updateUser(
		email: string,
		dto: UpdateUserDto,
	): Promise<UpdateUserDto> {
		try {
			await this.userRespository.update(dto, { where: { email } })
			return dto
		} catch (err) {
			throw new Error(err)
		}
	}

	async deleteUser(email: string): Promise<boolean> {
		try {
			await this.userRespository.destroy({
				where: { email },
			})
			return true
		} catch (err) {
			throw new Error(err)
		}
	}
}
