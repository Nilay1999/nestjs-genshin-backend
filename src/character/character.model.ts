import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Passive } from './sub-models/passive.model';
import { Skill } from './sub-models/skill.model';

@ObjectType()
export class Character {
  @Field((type) => Number)
  id: number;

  @Field((type) => String)
  name: string;

  @Field((type) => String)
  element: string;

  @Field((type) => String)
  weapon_type: string;

  @Field((type) => String)
  region: string;

  @Field((type) => Float)
  rarity: number;

  @Field((type) => String)
  gender: string;

  @Field((type) => Skill)
  skills: Skill;

  @Field((type) => Passive)
  passive_talent: Passive;

  @Field((type) => String, { nullable: true })
  image: string;
}
