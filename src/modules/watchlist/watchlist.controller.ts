import {
	Controller,
	Body,
	Post,
	Get,
	Req,
	Patch,
	UseGuards,
	Delete,
	Query,
} from '@nestjs/common'
import { WatchlistService } from './watchlist.service'
import { JwtAuthGuard } from 'src/guards/jwt-guard'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateAssetResponse } from './response/response'
import { WatchListDTO } from './dto/indexDto'

@Controller('watchlist')
export class WatchlistController {
	constructor(private readonly watchlistService: WatchlistService) {}

	@ApiTags('API')
	@ApiResponse({ status: 201, type: CreateAssetResponse })
	@UseGuards(JwtAuthGuard)
	@Post('create')
	createAsset(
		@Body() assetDto: WatchListDTO,
		@Req() request,
	): Promise<CreateAssetResponse> {
		const user = request.user
		return this.watchlistService.createAsset(user, assetDto)
	}

	@ApiTags('API')
	@ApiResponse({ status: 200 })
	@UseGuards(JwtAuthGuard)
	@Delete()
	deleteAssets(
		@Query('id') asstId: string,
		@Req() request,
	): Promise<boolean> {
		const { id } = request.user
		return this.watchlistService.deleteAsset(id, asstId)
	}
}
