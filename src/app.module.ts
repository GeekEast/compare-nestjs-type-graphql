import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';
import { v4 } from 'uuid';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        // add a namespace to each log
        name: 'Demo for Contextual Logging via nestjs-pino',
        // disable logging for response
        autoLogging: false,
        genReqId: (req, res) => {
          // customized requestId
          const id = req.headers['sapia-request-id'] || v4();
          res.setHeader('sapia-request-id', id);
          return id;
        },
        // and all the other fields of:w
        // - https://github.com/pinojs/pino-http#api
        // - https://github.com/pinojs/pino/blob/HEAD/docs/api.md#options-object
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
