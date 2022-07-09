import { Mutation, Parent, Query, ResolveField } from '@nestjs/graphql';
import { Args, Resolver } from '@nestjs/graphql';
import { CharacterUpdateInput } from './character-dto/character-update.input';
import { CharacterInput } from './character-dto/character.input';
import { Character } from './character.model';
import { CharacterService } from './character.service';
import { Passive } from './sub-models/passive.model';

@Resolver(() => Character)
export class CharacterResolver {
  constructor(private readonly characterService: CharacterService) {}

  @Query(() => Character)
  async getCharacterById(@Args('character_id') character_id: number) {
    return this.characterService.getCharacterById(character_id);
  }

  @Query(() => [Character])
  async getAllCharacters() {
    return this.characterService.getAllCharacters();
  }

  @Mutation(() => Character)
  async addCharacter(@Args('data') data: CharacterInput) {
    return this.characterService.addCharacter(data);
  }

  @Mutation(() => Character)
  async updateCharacter(
    @Args('data') data: CharacterUpdateInput,
    @Args('id') id: number,
  ) {
    return this.characterService.updateCharacter(id, data);
  }

  @Mutation(() => Character)
  async deleteCharacter(@Args('character_id') id: number) {
    return this.characterService.deleteCharacter(id);
  }
}
