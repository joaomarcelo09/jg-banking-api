import { ApiProperty } from "@nestjs/swagger"
import { IsObject, IsString } from "class-validator"
import { PeopleCreateDto } from "src/services/people/dto/create-people.dto"

export class CreateUserDto {

    @ApiProperty()
    @IsString()
    password: string

    @ApiProperty()
    @IsObject()
    people: PeopleCreateDto
}
