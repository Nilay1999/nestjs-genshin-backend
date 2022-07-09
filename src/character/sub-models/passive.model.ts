import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Passive {
  @Field((type) => Number)
  id: number;

  @Field((type) => String)
  default_passive_talent: string;

  @Field((type) => String)
  ascension_1_talent: string;

  @Field((type) => String)
  ascension_2_talent: string;
}
