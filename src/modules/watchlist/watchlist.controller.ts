import { Controller, Body, Post, Get, Req, Patch, UseGuards, Delete, Query } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { WatchListDTO } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt-guard';


@Controller('watchlist')
export class WatchlistController {
    constructor(private readonly watchlistService: WatchlistService) { }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    createAsset(@Body() assetDto: WatchListDTO, @Req() request) {
        const user = request.user
        return this.watchlistService.createAsset(user, assetDto)
    }
    @Get('get-all')
    getAllAssets() {
        return
    }
    @Patch('update')
    updateAsset() {
        return

    }
    @Delete()
    deleteAssets(@Query('id') id: string) {
        return
    }

}
