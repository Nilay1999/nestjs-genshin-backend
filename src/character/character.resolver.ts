import { Mutation, Query, Args, Resolver } from '@nestjs/graphql';
import { CharacterFilterDto } from './character-dto/character-filter.dto';
import { CharacterUpdateInput } from './character-dto/character-update.input';
import { CharacterInput } from './character-dto/character.input';
import { Character } from './character.model';
import { CharacterService } from './character.service';

@Resolver(() => Character)
export class CharacterResolver {
  constructor(private readonly characterService: CharacterService) {}

  @Query(() => Character)
  async getCharacterById(@Args('character_id') character_id: number) {
    return this.characterService.getCharacterById(character_id);
  }

  @Query(() => [Character])
  async getAllCharacters(
    @Args('query', { nullable: true }) query: CharacterFilterDto,
  ) {
    return this.characterService.getAllCharacters(query);
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
