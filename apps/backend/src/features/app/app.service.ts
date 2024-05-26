import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RoleService, UserService } from '@snipcode/domain';

import { EnvironmentVariables } from '../../configs/environment';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables, true>,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.roleService.loadRoles();

    const adminRole = await this.roleService.findByName('admin');

    if (!adminRole) {
      throw new Error('[Data Loader]: Role administrator not found');
    }

    const adminPassword = this.configService.get<string>('ADMIN_PASSWORD');

    await this.userService.loadAdminUser(adminRole, adminPassword);
  }
}
