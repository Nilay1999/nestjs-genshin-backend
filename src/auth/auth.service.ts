import { Injectable } from '@nestjs/common';
import { AuthDto } from './auth.dto.ts/auth.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}
  async login(authDto: AuthDto) {
    const user = await this.prismaService.user.findFirst({
      where: { email: authDto.email },
    });
    if (!user) {
      return 'Unable to find User ! please check your email';
    }
    if (!(authDto.password == user.password)) {
      return 'Password incorrect';
    } else {
      return user;
    }
  }
}
