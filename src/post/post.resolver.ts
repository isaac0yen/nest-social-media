import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { NotFoundException, BadRequestException } from '@nestjs/common';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  async createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    try {
      return await this.postService.create(createPostInput);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Query(() => [Post])
  async findAllPosts() {
    try {
      const posts = await this.postService.findAll();
      return posts;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Query(() => Post)
  async findPost(@Args('id', { type: () => Int }) id: number) {
    try {
      return await this.postService.findOne(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Mutation(() => Post)
  async removePost(@Args('id', { type: () => Int }) id: number) {
    try {
      return await this.postService.remove(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Mutation(() => Post)
  async likePost(@Args('id', { type: () => Int }) id: number) {
    try {
      return await this.postService.incrementLikes(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
