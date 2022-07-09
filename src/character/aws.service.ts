import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsService {
  AWS_S3_BUCKET = process.env.AWS_S3_BUCKET_NAME;
  s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  async uploadImage(buffer, fileName: string) {
    const imageData = await this.s3
      .upload({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Body: buffer,
        Key: fileName,
      })
      .promise();

    return imageData;
  }
}
