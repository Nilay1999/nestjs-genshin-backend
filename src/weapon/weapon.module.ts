import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { WeaponResolver } from './weapon.resolver';
import { WeaponService } from './weapon.service';
import { WeaponController } from './weapon.controller';
import { MulterModule } from '@nestjs/platform-express';
import { AwsService } from 'src/character/aws.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  providers: [WeaponService, WeaponResolver, PrismaService, AwsService],
  controllers: [WeaponController],
})
export class WeaponModule {}
