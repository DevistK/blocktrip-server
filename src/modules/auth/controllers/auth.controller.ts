import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Member } from 'src/repositories/entities/member.entity';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { User } from 'src/common/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() data) {
    return this.authService.login(data as Member);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@User() user: Member) {
    return user;
  }
}
