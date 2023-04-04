import { ApiProperty } from "@nestjs/swagger";
import { IsString, } from "class-validator";


export class CreateUserDto {

    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsString()
    password: string;
}
export class UpdateUserDto {
    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsString()
    email: string;
}