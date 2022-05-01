import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createAccount(createUserDto: CreateUserDto): Promise<any> {
    const isExist = await this.userRepository.findOne({
      email: createUserDto.email,
    });
    if (isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`이미 등록된 사용자입니다.`],
        error: 'Forbidden',
      });
    }

    createUserDto.password = await hashPassword(createUserDto.password);
    const { password, ...result } = await this.userRepository.save(
      createUserDto,
    );

    Logger.log(`[POST]=> 유저를 등록하였습니다.`);
    return result;
  }

  async findAllUser(): Promise<User[]> {
    Logger.log(`[GET]=> 모든 유저를 조회했습니다.`);
    return this.userRepository.find();
  }

  async findOneUser(email: string): Promise<User> {
    Logger.log(`[GET]=> 해당 유저를 조회했습니다.`);
    return this.userRepository.findOne({ email: email });
  }
}
