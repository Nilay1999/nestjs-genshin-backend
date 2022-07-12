import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from 'src/user/user.model';

@ObjectType()
export class AuthModel {
  @Field()
  token: string;

  @Field()
  user: UserModel;
}
