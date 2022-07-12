import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserInput } from './user-dto/user.input';
import { UserModel } from './user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async registerUser(user: UserInput): Promise<UserModel | null> {
    try {
      const { email, password, username } = user;
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(password, saltOrRounds);
      const userData = await this.prismaService.user.create({
        data: {
          email: email,
          password: hash,
          username: username,
          role: 'user',
        },
        select: {
          id: true,
          email: true,
          password: true,
          username: true,
          role: true,
        },
      });
      return userData;
    } catch (error) {
      throw new Error(error);
    }
  }
}
