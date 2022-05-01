import { IsEmail, IsNumber, IsNumberString, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsString()
  birth: string;

  @IsString()
  hp: string;
}
