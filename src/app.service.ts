import { Inject, Injectable } from '@nestjs/common';
import { IRepository } from './repos/repo.interface';

@Injectable()
export class AppService {
  @Inject('AppRepo')
  private readonly appRepo: IRepository;

  getHello(): string {
    return this.appRepo.getHello();
  }
}
