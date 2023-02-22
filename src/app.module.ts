import { Module, Provider, Scope } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppContext } from './app.context';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

const ContextProvider: Provider = {
  provide: AppContext,
  useFactory: (req: Request) => new AppContext(req),
  inject: [REQUEST],
  scope: Scope.REQUEST,
};

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ContextProvider],
})
export class AppModule {}
