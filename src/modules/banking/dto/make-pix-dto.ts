import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class MakePixDto {

    @ApiProperty()
    @IsString()
    key_pix: string

    @ApiProperty()
    @IsNumber()
    value: number
}
