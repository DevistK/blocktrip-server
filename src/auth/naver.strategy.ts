import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver';
import { AuthService } from './auth.service';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private authService: AuthService
    ) {
        super({
            clientId: configService.get('NAVER_CLIENT_ID'),
            clientSecret: configService.get('NAVER_CLIENT_SECRET'),
            callbackURL: configService.get('NAVER_CALLBACK_URL'),
            // 콜백 테스트 임의 URL
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: any,
    ): Promise<any> {
        const user_email = profile._json.email;
        const user_nick = profile._json.nickname;
        const user_mobile = profile._json.mobile;
        const user_provider = profile.provider;
        const user_profile = {
            user_email,
            user_nick,
            user_mobile,
            user_provider,
        };

        const user = await this.authService.validateUser(user_email, "");
        if (user === null) {
            Logger.log(`네이버 토큰 발급`);
            const once_token = this.authService.onceToken(user_profile);
            return { once_token, type: 'once' };
        }
    }
}




// [SUCCESS] => 네이버 로그인 연동 URL 생성
// https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=XT6VvP2XW6zTDfqsdIN8&redirect_uri=http://localhost:3001/auth/naver&state=HIw6Tr0Ywj