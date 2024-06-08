import { Controller, Get, Param, Res, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { createReadStream, existsSync } from 'fs';

@Controller('image')
export class ImageController {
  @Get(':key')
  async getImage(@Param('key') key: string, @Res() res: Response) {
    const getImagePath = (key) => {
      const imagePath = join(__dirname, '..', '..', 'images', key);
      const extensions = ['.png', '.jpg', '.jpeg'];

      for (const ext of extensions) {
        const filePath = `${imagePath}${ext}`;
        if (existsSync(filePath)) {
          return filePath;
        }
      }

      throw new Error(`Image with key ${key} not found`);
    };

    let imagePath;
    try {
      imagePath = getImagePath(key);
    } catch (error) {
      throw new NotFoundException(
        `Error reading image with key ${key}: ${error.message}`,
      );
    }

    createReadStream(imagePath).pipe(res);
  }
}
