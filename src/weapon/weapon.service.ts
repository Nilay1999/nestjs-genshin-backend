import { Injectable } from '@nestjs/common';
import { weapon } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import WeaponUpdateInput from './weapon-dto/weapon-update.input';
import WeaponInput from './weapon-dto/weapon.input';
import { Weapon } from './weapon.model';

@Injectable()
export class WeaponService {
  constructor(public readonly prismaService: PrismaService) {}
  async getWeaponById(weapon_id: number): Promise<Weapon | null> {
    try {
      const weaponData = await this.prismaService.weapon.findFirst({
        where: {
          id: weapon_id,
          deleted: false,
        },
        select: {
          id: true,
          name: true,
          rarity: true,
          base_attack: true,
          weapon_type: true,
          secondary_state: true,
          bonus: true,
          location: true,
          passive: true,
          image: true,
        },
      });

      if (!weaponData) {
        throw new Error('Weapon not found');
      } else {
        return weaponData;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllWeapon(): Promise<Weapon[] | []> {
    try {
      return await this.prismaService.weapon.findMany({
        select: {
          id: true,
          name: true,
          rarity: true,
          base_attack: true,
          weapon_type: true,
          secondary_state: true,
          bonus: true,
          location: true,
          passive: true,
          image: true,
          deleted: false,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getMaterial(weaponName: string) {
    let weaponInfo = await this.prismaService.weapon.findFirst({
      where: {
        name: weaponName,
      },
    });
    return weaponInfo;
  }

  async addWeapon(weaponInput: WeaponInput): Promise<Weapon | string> {
    try {
      if (!weaponInput) {
        throw new Error('Please enter all fields');
      } else {
        const {
          weaponType,
          secondaryState,
          rarity,
          baseAttack,
          name,
          bonus,
          location,
          passive,
        } = weaponInput;

        const isWeaponExists = await this.prismaService.weapon.findFirst({
          where: {
            name: {
              equals: name,
              mode: 'insensitive',
            },
          },
        });

        if (isWeaponExists) {
          throw new Error('Same weapon already exists!');
        } else {
          const weaponData = await this.prismaService.weapon.create({
            data: {
              name: name,
              rarity: rarity,
              base_attack: baseAttack,
              weapon_type: weaponType,
              secondary_state: secondaryState,
              bonus: bonus,
              location: location,
              passive: passive,
            },
            select: {
              name: true,
              rarity: true,
              base_attack: true,
              weapon_type: true,
              secondary_state: true,
              bonus: true,
              location: true,
              passive: true,
              id: true,
            },
          });
          return weaponData;
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateWeapon(data: WeaponUpdateInput, id: number): Promise<Weapon> {
    try {
      if (!data) {
        throw new Error('Please enter some data');
      } else {
        const {
          baseAttack,
          bonus,
          location,
          name,
          passive,
          rarity,
          secondaryState,
          weaponType,
        } = data;
        const updateData = await this.prismaService.weapon.update({
          where: {
            id: id,
          },
          data: {
            base_attack: baseAttack,
            bonus: bonus,
            location: location,
            secondary_state: secondaryState,
            rarity: rarity,
            passive: passive,
            name: name,
            weapon_type: weaponType,
          },
        });

        return updateData;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async deletedWeapon(id: number) {
    try {
      const weapon = await this.prismaService.weapon.findFirst({
        where: { id: id, deleted: false },
      });

      if (!weapon) {
        throw new Error('Weapon already deleted !');
      } else {
        const deletedWeapon = await this.prismaService.weapon.update({
          where: { id: id },
          data: {
            deleted: true,
          },
          select: {
            id: true,
          },
        });

        return deletedWeapon;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
