import { Injectable, BadRequestException } from '@nestjs/common'
import { UserService } from './../user/user.service'
import { CreateUserDto } from '../user/dto'
import { UserLoginDto } from './dto'
import { AppError } from 'src/common/contacts/errors'
import * as bcrypt from 'bcrypt'
import { AuthUserResponse } from './response'
import { TokenService } from './../token/token.service'

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly tokenService: TokenService,
	) {}

	async registerUsers(dto: CreateUserDto): Promise<CreateUserDto> {
		try {
			const existUser = await this.userService.findUserByEmail(dto.email)
			if (existUser) throw new BadRequestException(AppError.USER_EXIST)
			return this.userService.createUsers(dto)
		} catch (err) {
			throw new Error(err)
		}
	}
	async loginUser(dto: UserLoginDto): Promise<AuthUserResponse> {
		try {
			const existUser = await this.userService.findUserByEmail(dto.email)
			if (!existUser)
				throw new BadRequestException(AppError.USER_NOT_EXISTS)
			const validatePassword = await bcrypt.compare(
				dto.password,
				existUser.password,
			)
			if (!validatePassword)
				throw new BadRequestException(AppError.WRONG_DATA)
			const user = await this.userService.publicUser(dto.email)
			const token = await this.tokenService.genereteJwtToken(user)
			return { user, token }
		} catch (err) {
			throw new Error(err)
		}
	}
}
