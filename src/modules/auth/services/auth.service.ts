import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Member } from 'src/repositories/entities/member.entity';
import { UserService } from 'src/modules/user/services/user.service';
import { hashPasswordCompare } from 'src/common/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneUser(email);
    if (!user) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`등록되지 않은 유저 입니다.`],
        error: 'Forbidden',
      });
    }

    const isMatch = await hashPasswordCompare(password, user.password);
    if (isMatch) {
      return user;
    } else {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`계정이 일치하지 않습니다.`],
        error: 'Forbidden',
      });
    }
  }

  async login(user: Member) {
    const payload = { username: user.email, sub: 'localClient' };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
