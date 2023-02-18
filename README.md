## Contextual Logging

- [Contextual Logging](#contextual-logging)
  - [Install](#install)
  - [Send Request](#send-request)
  - [Customer Request Id and Headers](#customer-request-id-and-headers)



### Install
```
npm i nestjs-pino pino-http
```



### Send Request
```sh
curl --location --request GET 'localhost:3000' --header 'Content-Type: application/json'
```

- formatted response sample, note that **the req.id keeps the same from controller to service layer**
```json
{
"level": 30,
"time": 1676728703409,
"pid": 40344,
"hostname": "xxxx",
"name": "Demo for Contextual Logging via nestjs-pino",
"req": {
    "id": "ba525cc9-ebb1-47ce-bdc6-184d82f07d0d",
    "method": "GET",
    "url": "/",
    "query": {},
    "params": { "0": "" },
    "headers": {
    "host": "localhost:3000",
    "user-agent": "curl/7.85.0",
    "accept": "*/*",
    "content-type": "application/json"
    },
    "remoteAddress": "::ffff:127.0.0.1",
    "remotePort": 53198
},
"context": "AppController",
"msg": "this is the AppController getHello method"
}

{
"level": 30,
"time": 1676728703410,
"pid": 40344,
"hostname": "xxxx",
"name": "Demo for Contextual Logging via nestjs-pino",
"req": {
    "id": "ba525cc9-ebb1-47ce-bdc6-184d82f07d0d",
    "method": "GET",
    "url": "/",
    "query": {},
    "params": { "0": "" },
    "headers": {
    "host": "localhost:3000",
    "user-agent": "curl/7.85.0",
    "accept": "*/*",
    "content-type": "application/json"
    },
    "remoteAddress": "::ffff:127.0.0.1",
    "remotePort": 53198
},
"context": "AppService",
"msg": "this is the AppService getHello method"
}
```


### Customer Request Id and Headers
- `app.module.ts`
```typescript
@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        genReqId: (req, res) => {
          // consume upstream requestId or generate one using random generator
          const id = req.headers['sapia-request-id'] || v4();
          // set current request id
          res.setHeader('sapia-request-id', id);
          return id;
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```