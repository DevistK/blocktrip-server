import { ForbiddenException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { hashPasswordCompare } from 'src/utils/bcrypt';


@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {

        const user = await this.userService.findOneUser(email);
        if (!user) {
            Logger.error(`[POST]=> 등록되지 않은 유저입니다.`);
            throw new ForbiddenException({
                statusCode: HttpStatus.FORBIDDEN,
                message: [`등록되지 않은 유저 입니다.`],
                error: 'Forbidden',
            })
        }

        const isMatch = await hashPasswordCompare(password, user.password);
        if (isMatch) {
            const { password, ...result } = user;
            return result;
        } else {
            Logger.error(`[POST]=> 계정이 일치하지 않습니다.`);
            throw new ForbiddenException({
                statusCode: HttpStatus.FORBIDDEN,
                message: [`계정이 일치하지 않습니다.`],
                error: 'Forbidden',
            })
        }
    }

    async login(user: User) {
        const payload = { username: user.email, sub: user.id };
        return {
            Log: Logger.log(`[POST]=> JWT 토큰 발급`),
            access_token: this.jwtService.sign(payload),
        };
    }

}