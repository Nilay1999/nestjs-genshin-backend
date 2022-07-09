import { Field, ObjectType } from '@nestjs/graphql';

enum Region {
  liyue,
  mondstadt,
  inazuma,
}

@ObjectType()
export class Weapon {
  @Field((type) => Number)
  id: number;

  @Field((type) => String)
  name: string;

  @Field((type) => String)
  weapon_type: string;

  @Field((type) => Number)
  rarity: number;

  @Field((type) => String)
  passive: string;

  @Field((type) => String)
  bonus: string;

  @Field((type) => String)
  location: string;

  @Field((type) => Number)
  base_attack: number;

  @Field((type) => String)
  secondary_state: string;

  @Field((type) => String, { nullable: true })
  image?: string;
}
