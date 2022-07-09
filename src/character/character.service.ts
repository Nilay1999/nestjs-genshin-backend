import { Injectable } from '@nestjs/common';
import { character } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CharacterUpdateInput } from './character-dto/character-update.input';
import { CharacterInput } from './character-dto/character.input';
import { Character } from './character.model';

@Injectable()
export class CharacterService {
  constructor(private prisma: PrismaService) {}

  async getCharacterById(character_id: number): Promise<character> {
    try {
      const characterData = await this.prisma.character.findFirst({
        where: { id: character_id, deleted: false },
        include: {
          passive_talent: true,
          skills: true,
        },
      });
      if (!characterData) {
        throw new Error('Character not found');
      } else {
        return characterData;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllCharacters() {
    try {
      const characters = await this.prisma.character.findMany({
        where: { deleted: false },
        include: {
          skills: {
            select: {
              id: true,
              elemental_burst: true,
              elemental_skill: true,
              normal_attack: true,
            },
          },
          passive_talent: {
            select: {
              id: true,
              ascension_1_talent: true,
              ascension_2_talent: true,
              default_passive_talent: true,
            },
          },
        },
      });
      return characters;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getTalentsByUserId(id: number) {}

  async getSkillsByUserId(id: number) {}

  async addCharacter(characterData: CharacterInput): Promise<Character> {
    try {
      if (!characterData) {
        throw 'Please enter all fields';
      } else {
        const {
          name,
          element,
          gender,
          rarity,
          region,
          skills,
          talents,
          weapon_type,
        } = characterData;

        const {
          ascension_1_talent,
          ascension_2_talent,
          default_passive_talent,
        } = talents;

        const { elemental_burst, elemental_skill, normal_attack } = skills;

        const isCharacterAlreadyExists = await this.prisma.character.findFirst({
          where: {
            name: {
              equals: name,
              mode: 'insensitive',
            },
          },
        });

        if (isCharacterAlreadyExists) {
          throw new Error('Character already exists');
        } else {
          const talents = await this.prisma.passive_talent.create({
            data: {
              ascension_1_talent: ascension_1_talent,
              ascension_2_talent: ascension_2_talent,
              default_passive_talent: default_passive_talent,
            },
          });

          const skills = await this.prisma.skill.create({
            data: {
              elemental_burst: elemental_burst,
              elemental_skill: elemental_skill,
              normal_attack: normal_attack,
            },
          });

          const createdCharacter = await this.prisma.character.create({
            data: {
              image: '',
              name: name,
              element: element,
              weapon_type: weapon_type,
              gender: gender,
              rarity: rarity,
              region: region,
              skills: {
                connect: {
                  id: skills.id,
                },
              },
              passive_talent: {
                connect: {
                  id: talents.id,
                },
              },
            },
            include: {
              passive_talent: {
                select: {
                  id: true,
                  ascension_1_talent: true,
                  ascension_2_talent: true,
                  default_passive_talent: true,
                },
              },
              skills: {
                select: {
                  id: true,
                  elemental_burst: true,
                  elemental_skill: true,
                  normal_attack: true,
                },
              },
            },
          });

          return createdCharacter;
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateCharacter(
    id: number,
    characterData: CharacterUpdateInput,
  ): Promise<Character> {
    try {
      if (!characterData) {
        throw new Error('Please enter some data');
      } else {
        const {
          element,
          gender,
          name,
          rarity,
          region,
          skills,
          talents,
          weapon_type,
        } = characterData;

        const character = await this.prisma.character.findFirst({
          where: { id: id, deleted: false },
        });

        if (!character) {
          throw new Error('Character not found');
        } else {
          let skillData, talentData;
          if ({ ...skills }) {
            skillData = await this.prisma.skill.update({
              where: {
                id: character.skillId,
              },
              data: {
                ...skills,
              },
              select: {
                id: true,
              },
            });
          }
          if ({ ...talents }) {
            talentData = await this.prisma.passive_talent.update({
              where: {
                id: character.passive_talentId,
              },
              data: {
                ...talents,
              },
              select: {
                id: true,
              },
            });
          }

          const updatedData = await this.prisma.character.update({
            where: {
              id: id,
            },
            data: {
              element: element,
              gender: gender,
              name: name,
              passive_talent: { connect: { id: skillData.id } },
              skills: { connect: { id: skillData.id } },
              rarity: rarity,
              region: region,
              weapon_type: weapon_type,
            },
            include: {
              passive_talent: {
                select: {
                  id: true,
                  ascension_1_talent: true,
                  ascension_2_talent: true,
                  default_passive_talent: true,
                },
              },
              skills: {
                select: {
                  id: true,
                  elemental_burst: true,
                  elemental_skill: true,
                  normal_attack: true,
                },
              },
            },
          });
          return updatedData;
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteCharacter(id: number) {
    try {
      const character = await this.prisma.character.findFirst({
        where: { id: id, deleted: false },
      });

      if (!character) {
        throw new Error('User already deleted !');
      } else {
        const deletedCharacter = await this.prisma.character.update({
          where: { id: id },
          data: {
            deleted: true,
          },
          select: {
            id: true,
          },
        });

        return deletedCharacter;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
