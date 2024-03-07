import { ApiProperty } from "@nestjs/swagger"
import { IsMobilePhone, IsNumber, IsString } from "class-validator"

export class PeopleCreateDto {

    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @IsString()
    cpf: string

    @ApiProperty()
    @IsMobilePhone('pt-BR')
    telephone: number

    @ApiProperty()
    @IsString()
    email: string

    @ApiProperty()
    @IsString()
    date_birth: string
}