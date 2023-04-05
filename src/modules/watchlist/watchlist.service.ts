import { Injectable } from '@nestjs/common'
import { Watchlist } from './models/watchlist.model'
import { InjectModel } from '@nestjs/sequelize'
import { CreateAssetResponse } from './response'

@Injectable()
export class WatchlistService {
	constructor(
		@InjectModel(Watchlist)
		private readonly wachlistRepository: typeof Watchlist,
	) {}

	async createAsset(user, dto): Promise<CreateAssetResponse> {
		try {
			const watchlist = {
				user: user.id,
				name: dto.name,
				link: dto.link,
				assetId: dto.assetId,
			}
			await this.wachlistRepository.create(watchlist)
			return watchlist
		} catch (err) {
			throw new Error(err)
		}
	}
	async deleteAsset(userId: number, assetId: string): Promise<boolean> {
		try {
			await this.wachlistRepository.destroy({
				where: { id: assetId, user: userId },
			})
			return true
		} catch (err) {
			throw Error(err)
		}
	}
}
