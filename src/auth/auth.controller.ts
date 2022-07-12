import { Body, Controller, HttpStatus, Post, Response } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AuthDto } from './auth.dto.ts/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post()
  async login(@Body() authDto: AuthDto, @Response() res) {
    try {
      if (!authDto.email) {
        return await res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Enter your email !',
        });
      } else if (!authDto.password) {
        return await res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Enter your Password !',
        });
      } else {
        const user = await this.authService.login(authDto);
        const payload = { user: user };
        const jwt = await this.jwtService.signAsync(payload);
        return res.status(HttpStatus.OK).json({
          token: jwt,
          user,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
