import { IsNumber, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    email: string;

    @IsString()
    name: string;

    @IsString()
    password: string;

    @IsNumber()
    birth: number;

    @IsNumber()
    hp: number;
}