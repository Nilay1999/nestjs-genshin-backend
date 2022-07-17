import { UseGuards } from '@nestjs/common';
import { Args, Query } from '@nestjs/graphql';
import { Mutation, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { UpdateUserDto } from './user-dto/update-user.dto';
import { UserInput } from './user-dto/user.input';
import { UserModel } from './user.model';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Query(() => [UserModel])
  async getUsers() {
    return this.userService.getUsers();
  }

  @Mutation(() => UserModel)
  async registerUser(@Args('input') input: UserInput) {
    return this.userService.registerUser(input);
  }

  @Mutation(() => UserModel)
  async updateUser(
    @Args('input') input: UpdateUserDto,
    @Args('id') id: number,
  ) {
    return this.userService.updateUser(id, input);
  }
}
