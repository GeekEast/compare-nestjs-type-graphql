import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DynamoDBRepo } from './repos/dynamodb.repo';
import { MongoRepo } from './repos/mongo.repo';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    // * comment in/out to switch between dependency implementations
    { provide: 'AppRepo', useClass: MongoRepo },
    // { provide: 'AppRepo', useClass: DynamoDBRepo },
  ],
})
export class AppModule {}
