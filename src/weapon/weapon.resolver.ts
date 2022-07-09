import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import WeaponUpdateInput from './weapon-dto/weapon-update.input';
import WeaponInput from './weapon-dto/weapon.input';
import { Weapon } from './weapon.model';
import { WeaponService } from './weapon.service';

@Resolver(() => Weapon)
export class WeaponResolver {
  constructor(private readonly weaponService: WeaponService) {}

  @Query(() => Weapon)
  async getWeaponById(@Args('weapon_id') id: number) {
    return this.weaponService.getWeaponById(id);
  }

  @Query(() => [Weapon])
  async getAllWeapon() {
    return this.weaponService.getAllWeapon();
  }

  @Mutation(() => Weapon)
  async addWeapon(
    @Args({ name: 'input', type: () => WeaponInput })
    weaponInput: WeaponInput,
  ) {
    return this.weaponService.addWeapon(weaponInput);
  }

  @Mutation(() => Weapon)
  async updateWeapon(
    @Args('data') data: WeaponUpdateInput,
    @Args('id') id: number,
  ) {
    return this.weaponService.updateWeapon(data, id);
  }

  // @Mutation(() => Weapon)
  // async updateWeapon(@Args({ name: 'input' }) input) {}
}
