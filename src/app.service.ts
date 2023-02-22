import { Inject, Injectable } from '@nestjs/common';
import { AppContext } from './app.context';

@Injectable()
export class AppService {
  @Inject()
  appContext: AppContext;

  getHello(): string {
    console.log(this.appContext.toString());
    return 'Hello World!';
  }
}
