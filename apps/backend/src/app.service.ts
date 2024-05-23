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

    this.logger.log(roles);

    return 'Hello World!';
  }
}
