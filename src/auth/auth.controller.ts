import { Controller, Param, Post, UseGuards, Req, Patch, HttpCode, Header, Res, Body } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { RequestWithUser } from './interface/requestWithUser.interface';
import { TokenDto } from './dto/token.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('log-in')
  async login(@Req() request: RequestWithUser, @Res({passthrough:true}) res: Response ) {

    var {user} = request;
    var token = this.authService.getCookieWithJwtToken(user.email)["access_token"];
    this.authService.setCookieWithJwtToken(user.id, token);

    user.password = undefined;
    user.remember_token = undefined;
    user = {...user, ...{token:token}};
      
    res.cookie('Set-Cookie', token);
  
    return user;
  }

  @HttpCode(200)
  @Post('refresh-token')
  async refreshToken(@Body() token: TokenDto) {
    const refresh_token = this.authService.getCookieWithJwtRefreshToken(token.email, token.old_token);
    return refresh_token;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('log-out/:email')
  async logout(@Param('email') email: string, @Res({passthrough:true}) res: Response ) {
    res.cookie('Set-Cookie', `Authentication=; HttpOnly; Path=/; Max-Age=0`);

    return this.authService.logout(email);
  }
}