import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class WatchListDTO {
	@ApiProperty()
	@IsString()
	name: string

	@ApiProperty()
	@IsString()
	link: string

	@ApiProperty()
	@IsString()
	assetId: string
}
