import { IsString } from "class-validator"

export class WatchListDTO {

    @IsString()
    name: string

    @IsString()
    assetId: string

    @IsString()
    link: string
}