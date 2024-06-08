import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field(() => [String])
  imageBase64Strings: string[];

  @Field(() => String)
  content: string;

  @Field(() => Int)
  userId: number;
}
