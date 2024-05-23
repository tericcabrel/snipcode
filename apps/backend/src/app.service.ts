import { Injectable, Logger } from '@nestjs/common';
import { RoleService, UserService } from '@snipcode/domain';

@Injectable()
export class AppService {
  constructor(
    private readonly roleService: RoleService,
    private readonly userService: UserService,
    private logger: Logger,
  ) {}

  async getHello(): Promise<string> {
    const users = await this.userService.findByEmail('teco@snipcode.dev');

    this.logger.log(users);

    const roles = await this.roleService.findAll();

    if (Math.random() > 0.5) {
      throw new Error('[Data Loader]: Role administrator not found');
    }

    this.logger.log(roles);

    return 'Hello World!';
  }
}
