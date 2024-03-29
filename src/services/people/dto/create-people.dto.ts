import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsDateString, IsMobilePhone, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class PeopleCreateDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    cpf: string

    @ApiProperty()
    @IsNotEmpty()
    @IsMobilePhone('pt-BR')
    telephone: string | number

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    date_birth: string
}