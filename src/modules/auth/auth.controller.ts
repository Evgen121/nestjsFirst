import { Controller, Post, Body, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from '../user/dto/indexDto'
import { AuthUserResponse } from './response/response'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { UserLoginDto } from './dto/indexDto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiTags('API')
	@ApiResponse({ status: 201, type: CreateUserDto })
	@Post('register')
	register(@Body() dto: CreateUserDto): Promise<CreateUserDto> {
		return this.authService.registerUsers(dto)
	}
	@ApiTags('API')
	@ApiResponse({ status: 200, type: AuthUserResponse })
	@Post('login')
	login(@Body() dto: UserLoginDto): Promise<AuthUserResponse> {
		return this.authService.loginUser(dto)
	}
}
