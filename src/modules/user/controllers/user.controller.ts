import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create.user.dto';
import { Member } from '../../../repositories/entities/member.entity';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createAccount(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.userService.createAccount(createUserDto);
  }

  @Get()
  fetchAllUser(): Promise<Member[]> {
    return this.userService.findAllUser();
  }

  @Get(':email')
  findOneUser(@Param('email') email: string): Promise<Member> {
    return this.userService.findOneUser(email);
  }
}
