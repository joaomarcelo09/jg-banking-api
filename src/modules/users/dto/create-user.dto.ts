import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer";
import { IsNotEmpty, IsObject, IsString, Max, MaxLength, MinLength, ValidateNested } from "class-validator"
import { PeopleCreateDto } from "src/services/people/dto/create-people.dto"

export class CreateUserDto {

    @ApiProperty()
    @MinLength(5)
    @MaxLength(25)
    @IsNotEmpty()
    @IsString()
    password: string

    @ApiProperty()
    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => PeopleCreateDto)
    people: PeopleCreateDto;
}
