import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { NotFoundException, BadRequestException } from '@nestjs/common';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    try {
      return await this.userService.create(createUserInput);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Query(() => [User])
  async findAll() {
    try {
      const users = await this.userService.findAll();
      return users;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Query(() => User)
  async findOne(@Args('id', { type: () => Int }) id: number) {
    try {
      return await this.userService.findOne(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    try {
      return await this.userService.update(updateUserInput.id, updateUserInput);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Mutation(() => User)
  async removeUser(@Args('id', { type: () => Int }) id: number) {
    try {
      return await this.userService.remove(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Mutation(() => Boolean)
  async populateDb() {
    try {
      return await this.userService.populateDb();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
