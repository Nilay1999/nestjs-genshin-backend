import { InputType, Field } from '@nestjs/graphql';

@InputType()
export default class WeaponUpdateInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  weaponType?: string;

  @Field({ nullable: true })
  rarity?: number;

  @Field({ nullable: true })
  passive?: string;

  @Field({ nullable: true })
  bonus?: string;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  baseAttack?: number;

  @Field({ nullable: true })
  secondaryState?: string;
}
