import { Inject, Injectable } from '@nestjs/common';
// import { DevConfigService } from './common/providers/DevConfigService';

@Injectable()
export class AppService {
  constructor() {} // private config: { port: string }, // @Inject('CONFIG') // private devConfigService: DevConfigService,
  getHello(): string {
    return 'Hello World';
    // return `Hello World ${this.devConfigService.getDBHOST()} ${this.config.port}`;
  }
}
