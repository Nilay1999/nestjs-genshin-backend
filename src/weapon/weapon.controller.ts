import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { AwsService } from 'src/character/aws.service';
import { PrismaService } from 'src/prisma.service';

@Controller('weapon')
export class WeaponController {
  constructor(
    private readonly awsService: AwsService,
    private readonly prismaService: PrismaService,
  ) {}
  @Post('/upload/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCharacterImage(@Param('id') id, @UploadedFile() file) {
    const fileStream = createReadStream(file.path);
    const fileLocation = await this.awsService.uploadImage(
      fileStream,
      file.filename,
    );

    return await this.prismaService.weapon.update({
      where: { id: parseInt(id) },
      data: { image: fileLocation.Location },
    });
  }
}
