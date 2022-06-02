import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create.user.dto';
import { User } from '../user.entity';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // [유저생성]
  @Post()
  createAccount(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.userService.createAccount(createUserDto);
  }

  // [전체유저 리스트 조회]
  @Get()
  fetchAllUser(): Promise<User[]> {
    return this.userService.findAllUser();
  }

  // [특정유저 조회]
  @Get(':email')
  findOneUser(@Param('email') email: string): Promise<User> {
    return this.userService.findOneUser(email);
  }
}
