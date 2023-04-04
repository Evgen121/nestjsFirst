import { Injectable } from '@nestjs/common';
import { Watchlist } from './models/watchlist.model';
import { InjectModel } from '@nestjs/sequelize';


@Injectable()
export class WatchlistService {
    constructor(@InjectModel(Watchlist) private readonly wachlistRepository: typeof Watchlist) { }

    async createAsset(user, dto) {
        const watchlist = {
            user: user.id,
            name: dto.name,
            assetId: dto.assetId,
            link: dto.link
        }
        await this.wachlistRepository.create(watchlist)
        return watchlist
    }
}
