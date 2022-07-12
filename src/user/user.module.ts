import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma.service';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  providers: [
    UserResolver,
    UserService,
    PrismaService,
    AuthService,
    JwtService,
  ],
  controllers: [],
})
export class UserModule {}
