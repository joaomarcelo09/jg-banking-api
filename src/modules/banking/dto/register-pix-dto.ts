import { ApiProperty } from "@nestjs/swagger"
import { pix_key_key_type } from "@prisma/client"
import { IsEnum, IsString } from "class-validator"

export class RegisterPixDto {

    @ApiProperty()
    @IsString()
    key: string

    @ApiProperty()
    @IsEnum(['cpf', 'email', 'telephone'])
    type: pix_key_key_type
}
