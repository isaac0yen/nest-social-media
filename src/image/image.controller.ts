import { Controller, Get, Param, Res, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { createReadStream, existsSync } from 'fs';

@Controller('image')
export class ImageController {
  @Get(':key')
  async getImage(@Param('key') key: string, @Res() res: Response) {
    const imagePath = join(__dirname, '..', '..', 'images', key + '.png');
    // Check if the file exists before trying to read it
    if (!existsSync(imagePath)) {
      throw new NotFoundException(`Image with key ${key} not found`);
    }

    try {
      createReadStream(imagePath).pipe(res);
    } catch (error) {
      throw new NotFoundException(
        `Error reading image with key ${key}: ${error.message}`,
      );
    }
  }
}
