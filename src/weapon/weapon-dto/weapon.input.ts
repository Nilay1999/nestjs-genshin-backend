import { InputType, Field } from '@nestjs/graphql';

@InputType()
export default class WeaponInput {
  @Field()
  name: string;

  @Field()
  weaponType: string;

  @Field()
  rarity: number;

  @Field()
  passive: string;

  @Field()
  bonus: string;

  @Field()
  location: string;

  @Field()
  baseAttack: number;

  @Field()
  secondaryState: string;
}
