import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  async helloWorld(): Promise<string> {
    return 'Hello from Snipcode!';
  }
}
