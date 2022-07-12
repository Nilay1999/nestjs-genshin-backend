import { UseGuards } from '@nestjs/common';
import { Args, Query } from '@nestjs/graphql';
import { Mutation, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { UserInput } from './user-dto/user.input';
import { UserModel } from './user.model';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => UserModel)
  async register(@Args('input') userInput: UserInput) {
    return this.userService.registerUser(userInput);
  }
}
