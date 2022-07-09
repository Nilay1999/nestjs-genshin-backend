import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class SkillInput {
  @Field()
  normal_attack: string;

  @Field()
  elemental_skill: string;

  @Field()
  elemental_burst: string;
}

@InputType()
export class TalentInput {
  @Field()
  default_passive_talent: string;

  @Field()
  ascension_1_talent: string;

  @Field()
  ascension_2_talent: string;
}

@InputType()
export class CharacterInput {
  @Field()
  @IsNotEmpty({ message: 'Please enter character name' })
  name: string;

  @Field()
  @IsNotEmpty({ message: 'Please enter element type' })
  element: string;

  @Field()
  @IsNotEmpty({
    message: 'Please enter type of weapon that character is using',
  })
  weapon_type: string;

  @Field()
  @IsNotEmpty({ message: "Please enter character's gender" })
  gender: string;

  @Field()
  @IsNotEmpty({
    message: 'Please enter region',
  })
  region: string;

  @Field()
  @IsNotEmpty({
    message: 'Enter rarity eg. 4/5 star',
  })
  rarity: number;

  @Field((type) => SkillInput)
  skills: SkillInput;

  @Field((type) => TalentInput)
  talents: TalentInput;
}
