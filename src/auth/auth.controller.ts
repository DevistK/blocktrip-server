import { Controller, Get, Logger, Post, Request, UseGuards } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';



@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        // return req.user; => localAuthGuard Test return value
        return this.authService.login(req.user as User);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        Logger.log(`[GET]=> 프로필을 조회했습니다.`);
        return req.user;
    }
}