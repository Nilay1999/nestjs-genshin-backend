import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SkillUpdateInput {
  @Field({ nullable: true })
  normal_attack?: string;

  @Field({ nullable: true })
  elemental_skill?: string;

  @Field({ nullable: true })
  elemental_burst?: string;
}

@InputType()
export class TalentUpdateInput {
  @Field({ nullable: true })
  default_passive_talent?: string;

  @Field({ nullable: true })
  ascension_1_talent?: string;

  @Field({ nullable: true })
  ascension_2_talent?: string;
}

@InputType()
export class CharacterUpdateInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  element?: string;

  @Field({ nullable: true })
  weapon_type?: string;

  @Field({ nullable: true })
  gender?: string;

  @Field({ nullable: true })
  region?: string;

  @Field({ nullable: true })
  rarity?: number;

  @Field((type) => SkillUpdateInput, { nullable: true })
  skills?: SkillUpdateInput;

  @Field((type) => TalentUpdateInput, { nullable: true })
  talents?: TalentUpdateInput;
}
