import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserInput } from './user-dto/user.input';
import { UserModel } from './user.model';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './user-dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUsers(): Promise<UserModel[] | null> {
    try {
      return await this.prismaService.user.findMany({});
    } catch (error) {
      console.log(error);
    }
  }

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

  async updateUser(id: number, data: UpdateUserDto) {
    try {
      const updatedData = await this.prismaService.user.update({
        where: { id: id },
        data: { ...data },
        select: {
          id: true,
          username: true,
          email: true,
        },
      });
      return updatedData;
    } catch (error) {
      console.log(error);
    }
  }
}
