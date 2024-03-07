import { ApiProperty } from "@nestjs/swagger"
import { pix_key_key_type } from "@prisma/client"
import { IsEnum, IsString } from "class-validator"
import { RegisterPixDto } from "./register-pix-dto"

export class ExcludePixDto extends RegisterPixDto {
}
