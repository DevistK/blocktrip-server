import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { hashPassword } from 'src/common/utils/bcrypt';
import { CreateUserDto } from '../dto/create.user.dto';
import { Member } from '../../../repositories/entities/member.entity';
import { UserRepository } from '../../../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createAccount(createUserDto: CreateUserDto): Promise<any> {
    const isExist = await this.userRepository.fetchOneRow({
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
    const { ...result } = await this.userRepository.insertRow(createUserDto);

    return result;
  }

  async findAllUser() {
    return this.userRepository.fetchAllRow();
  }

  async findOneUser(email: string): Promise<Member> {
    return this.userRepository.fetchOneRow({ email: email });
  }
}
