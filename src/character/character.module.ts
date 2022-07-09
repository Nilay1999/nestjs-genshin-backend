import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CharacterResolver } from './character.resolver';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { MulterModule } from '@nestjs/platform-express';
import { AwsService } from './aws.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  providers: [CharacterService, CharacterResolver, PrismaService, AwsService],
  controllers: [CharacterController],
})
export class CharacterModule {}
