import { IRepository } from './repo.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MongoRepo implements IRepository {
  getHello(): string {
    return 'Hello MongoDB';
  }
}
