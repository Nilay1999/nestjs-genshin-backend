import { Field, InputType } from '@nestjs/graphql';

enum RoleValue {
  'user',
  'admin',
}

@InputType()
export class UserInput {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  role: RoleValue;
}
