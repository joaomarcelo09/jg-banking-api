import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsString } from "class-validator"

export class RegisterPixDto {

    @ApiProperty()
    @IsEnum(['cpf', 'email', 'telephone'])
    type: String
}
