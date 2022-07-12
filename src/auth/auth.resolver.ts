import { Body, HttpStatus, Response } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { String } from 'aws-sdk/clients/acm';
import { UserModel } from 'src/user/user.model';
import { AuthDto } from './auth.dto.ts/auth.dto';
import { AuthModel } from './auth.dto.ts/auth.model';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Mutation(() => AuthModel)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    try {
      if (!email) {
        throw new Error('Enter your email !');
      } else if (!password) {
        throw new Error('Enter your Password !');
      } else {
        const user = await this.authService.login({ email, password });
        const payload = { user: user };
        const jwt = await this.jwtService.signAsync(payload);
        return {
          token: jwt,
          user,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }
}
