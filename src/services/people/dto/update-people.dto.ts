import { ApiProperty } from "@nestjs/swagger"
import { IsMobilePhone, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class PeopleUpdateDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty()
    @IsNotEmpty()
    @IsMobilePhone('pt-BR')
    telephone: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    date_birth: string
}