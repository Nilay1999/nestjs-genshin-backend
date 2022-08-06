import {
  Controller,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { PrismaService } from 'src/prisma.service';
import { AwsService } from './aws.service';

@Controller('character')
export class CharacterController {
  constructor(
    private readonly awsService: AwsService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post('/upload/:id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'background', maxCount: 1 },
    ]),
  )
  async uploadCharacterImage(
    @Param('id') id,
    @UploadedFiles()
    files: {
      avatar?: Express.Multer.File[];
      background?: Express.Multer.File[];
    },
  ) {
    const imageStream = createReadStream(files.avatar[0].path);
    const imageFileLocation = await this.awsService.uploadImage(
      imageStream,
      files.avatar[0].filename,
    );
    const bannerStream = createReadStream(files.background[0].path);
    const bannerFileLocation = await this.awsService.uploadImage(
      bannerStream,
      files.background[0].filename,
    );
    return await this.prismaService.character.update({
      where: { id: parseInt(id) },
      data: {
        image: imageFileLocation.Location,
        banner_image: bannerFileLocation.Location,
      },
      include: {
        skills: true,
        passive_talent: true,
      },
    });
  }
}
