import { InputType } from '@nestjs/graphql';

enum RoleValue {
  user,
  admin,
}

@InputType()
export class UserInput {
  username: string;

  email: string;

  password: string;

  role: RoleValue;
}
