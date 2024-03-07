import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PeopleUpdateDto } from 'src/services/people/dto/update-people.dto';

export class UpdateUserDto {

   
    @ApiProperty()
    @MinLength(5)
    @MaxLength(25)
    @IsNotEmpty()
    @IsString()
    password: string

    @ApiProperty()
    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => PeopleUpdateDto)
    people: PeopleUpdateDto;
}
