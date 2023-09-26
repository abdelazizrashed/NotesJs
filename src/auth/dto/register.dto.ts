import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @IsEmail()
    @ApiProperty()

    email: string;

    @IsNotEmpty()
    @ApiProperty()

    password: string;

    @IsNotEmpty()
    @ApiProperty()

    name: string;
}
