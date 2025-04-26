import { Controller, Get, Post, Req, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Bu yönlendirme için kullanılabilir
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    return this.authService.login(req.user);
  }

  @Post('google') // YENİ EKLEDİK
  async loginWithGoogle(@Body('access_token') accessToken: string) {
    return this.authService.loginWithGoogle(accessToken);
  }
}
