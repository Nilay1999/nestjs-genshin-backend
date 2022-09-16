import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CharacterFilterDto {
  @Field({ nullable: true })
  element?: string;

  @Field({ nullable: true })
  weapon_type?: string;

  @Field({ nullable: true })
  gender?: string;

  @Field({ nullable: true })
  rarity?: number;
}
