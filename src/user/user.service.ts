import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const newUser = this.userRepository.create(createUserInput);
    return this.userRepository.save(newUser);
  }

  async findAll() {
    const users = await this.userRepository.find();
    // Wrap the result in an array to ensure an empty array is returned if there are no users
    return Array.from(users);
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    Object.assign(user, updateUserInput);
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return this.userRepository.remove(user);
  }

  async populateDb() {
    //Function to populate the User table with 6 dummy data
    const userData = [
      {
        username: 'john_doe',
        followers: 500,
        followings: 200,
      },
      {
        username: 'jane_smith',
        followers: 300,
        followings: 150,
      },
      {
        username: 'sam_jackson',
        followers: 800,
        followings: 400,
      },
      {
        username: 'sara_carter',
        followers: 600,
        followings: 300,
      },
    ];
    //Check if the user table has more than 0 records
    const users = await this.findAll();
    if (users.length > 0) {
      return false;
    }
    for (const user of userData) {
      await this.create(user);
    }
    return true;
  }
}
