import { IRepository } from './repo.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DynamoDBRepo implements IRepository {
  getHello(): string {
    return 'Hello DynamoDB';
  }
}
