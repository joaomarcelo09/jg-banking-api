import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class WithdrawBankingDto {

    @ApiProperty()
    @IsNumber()
    value: number
}
