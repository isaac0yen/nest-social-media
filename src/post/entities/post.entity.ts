import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity'; // adjust the path based on your project structure

@Entity()
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column('text', { array: true })
  @Field(() => [String])
  imageHashes: string[];

  @ManyToOne(() => User, (user) => user.posts)
  @Field(() => User) // Add this line
  user: User;

  @Column({ default: 0 })
  @Field(() => Int)
  likes: number;
}
