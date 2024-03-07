import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class PeopleCreateDto {

    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @IsString()
    cpf: string

    @ApiProperty()
    @IsNumber()
    telephone: number

    @ApiProperty()
    @IsString()
    email: string

    @ApiProperty()
    @IsString()
    date_birth: string
}