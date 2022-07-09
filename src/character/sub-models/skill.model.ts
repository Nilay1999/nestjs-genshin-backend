import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Skill {
  @Field((type) => Number)
  id: number;

  @Field((type) => String)
  normal_attack: string;

  @Field((type) => String)
  elemental_skill: string;

  @Field((type) => String)
  elemental_burst: string;
}
