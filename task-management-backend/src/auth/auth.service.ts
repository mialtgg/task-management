import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async loginWithGoogle(accessToken: string) {
    const response = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userData = response.data;
    // Burada userData'yı kullanarak kullanıcıyı DB'ye kaydedebilir ya da sadece dönebilirsin

    return {
      message: 'Google login successful',
      user: userData,
    };
  }
  async login(user: any) {
    // Payload’e minimal bilgi koy
    const payload = { email: user.email, sub: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  
}
