import { Body, Controller, Delete, Patch, Req, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { UpdateUserDto } from './dto/indexDto'
import { JwtAuthGuard } from 'src/guards/jwt-guard'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@ApiTags('API')
	@ApiResponse({ status: 200, type: UpdateUserDto })
	@UseGuards(JwtAuthGuard)
	@Patch()
	updateUser(
		@Body() updateDto: UpdateUserDto,
		@Req() request,
	): Promise<UpdateUserDto> {
		const user = request.user
		return this.userService.updateUser(user.email, updateDto)
	}

	@UseGuards(JwtAuthGuard)
	@Delete()
	deleteUser(@Req() request): Promise<boolean> {
		const user = request.user
		return this.userService.deleteUser(user.email)
	}

	/*   @Get()
      getUsers() {
          return this.userService.getUsers()
  
      } */

	/*     @Post('register')
        createUser(@Body() dto: CreateUserDto) {
            return this.userService.createUsers(dto)
        } */
}
