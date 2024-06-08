import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import * as crypto from 'crypto';
import { User } from 'src/user/entities/user.entity';
import { promises as fs } from 'fs';
import { dirname } from 'path';

async function customWriteFile(
  filePath: string,
  data: string | Buffer,
): Promise<void> {
  try {
    // Get the directory name from the file path
    const directory = dirname(filePath);

    // Check if the directory exists, and create it if it doesn't
    await fs.mkdir(directory, { recursive: true });

    // Write the file inside the directory
    await fs.writeFile(filePath, data);
  } catch (error) {
    console.error(`Error writing file to ${filePath}:`, error);
    throw error;
  }
}

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
  ) {}

  async create(createPostInput: CreatePostInput) {
    const user = await this.userService.findOne(createPostInput.userId);
    if (!user) {
      throw new Error(`User with ID ${createPostInput.userId} not found`);
    }

    const imageHashes = await Promise.all(
      createPostInput.imageBase64Strings.map(async (base64String) => {
        // Extract the file extension and the base64 data
        const matches = base64String.match(/^data:image\/(.*);base64,(.*)$/);
        if (!matches || matches.length !== 3) {
          throw new Error('Invalid base64 string');
        }
        const extension = matches[1];
        const data = matches[2];

        const hash = crypto.createHash('sha256');
        hash.update(data);
        const imageHash = hash.digest('hex');

        // Decode the base64 string
        const buffer = Buffer.from(data, 'base64');
        await customWriteFile(`./images/${imageHash}.${extension}`, buffer);

        return imageHash;
      }),
    );

    const newPost = this.postRepository.create({
      imageHashes: imageHashes,
      user,
    });

    return this.postRepository.save(newPost);
  }

  async findAll() {
    const posts = await this.postRepository.find({ relations: ['user'] });
    return Array.from(posts);
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    return post;
  }

  async remove(id: number) {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new Error(`Post with ID ${id} not found`);
    }
    return this.postRepository.remove(post);
  }

  async incrementLikes(id: number) {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new Error(`Post with ID ${id} not found`);
    }
    post.likes += 1;
    return this.postRepository.save(post);
  }
}
