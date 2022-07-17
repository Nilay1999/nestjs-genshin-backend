import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { PrismaService } from 'src/prisma.service';
import { AwsService } from './aws.service';
import { CharacterService } from './character.service';

@Controller('character')
export class CharacterController {
  constructor(
    private readonly awsService: AwsService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post('/upload-image/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCharacterImage(@Param('id') id, @UploadedFile() file) {
    const fileStream = createReadStream(file.path);
    const fileLocation = await this.awsService.uploadImage(
      fileStream,
      file.filename,
    );

    return await this.prismaService.character.update({
      where: { id: parseInt(id) },
      data: { image: fileLocation.Location },
      include: {
        skills: true,
        passive_talent: true,
      },
    });
  }

  @Post('/upload-banner/:id')
  @UseInterceptors(FileInterceptor('banner'))
  async uploadCharacterBanner(@Param('id') id, @UploadedFile() file) {
    const fileStream = createReadStream(file.path);
    const fileLocation = await this.awsService.uploadImage(
      fileStream,
      file.filename,
    );

    return await this.prismaService.character.update({
      where: { id: parseInt(id) },
      data: { banner_image: fileLocation.Location },
      include: {
        skills: true,
        passive_talent: true,
      },
    });
  }
}
