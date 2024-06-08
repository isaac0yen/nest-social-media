import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  username: string;

  @Field(() => Int)
  followers: number;

  @Field(() => Int)
  followings: number;
}
