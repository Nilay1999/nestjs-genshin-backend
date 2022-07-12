import { UseGuards } from '@nestjs/common';
import { Args, Query } from '@nestjs/graphql';
import { Mutation, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { UserModel } from './user.model';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  // @Query()
  // async getUserById() {}

  // @Query()
  // async getUsers() {}

  // @Mutation(() => UserModel)
  // async login() {}

  // @Mutation()
  // async register() {}
}
