

## Access to Request Info anywhere

You want to print some logs with request information but don't know where to get it in nest.js?

see this code example and you will figure it out.

Thanks for nest.js to make this super simple and intuitive

Inject the REQUEST object into AppModule, **notes that make the scope as `REQUEST` is the key**
```typescript
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
  // ! very important
  scope: Scope.REQUEST,
};

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ContextProvider],
})
export class AppModule {}
```

Since it's usually needed to create customized Context Object for you service, you could create the AppContext class
```typescript
import { Request } from 'express';
import { IncomingHttpHeaders } from 'http';

export class AppContext {
  private readonly _headers: IncomingHttpHeaders;
  private readonly _url: string;
  private readonly _hostname: string;
  private readonly _params: Record<string, string>;
  private readonly _body: any;

  constructor(req: Request) {
    this._headers = req.headers;
    this._url = req.url;
    this._params = req.params;
    this._hostname = req.hostname;
    this._body = req.body;
  }

  public get url(): string {
    return this._url;
  }

  public get params(): Record<string, string> {
    return this._params;
  }

  public get hostname(): string {
    return this._hostname;
  }

  public get headers(): IncomingHttpHeaders {
    return this._headers;
  }

  public get body(): any {
    return this._body;
  }

  // for logging convenience
  toString(): string {
    return JSON.stringify({
      headers: this._headers,
      hostname: this._hostname,
      url: this._url,
      params: this._params,
      body: this._body,
    });
  }
}
```

And that's it, now you can access your customized Context object anywhere within your application. for example, in `app.service.ts`

```typescript
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
```
will print as below
```json
{
    "headers": {
        "host": "localhost:3000",
        "connection": "keep-alive",
        "cache-control": "max-age=0",
        "sec-ch-ua": "\"Not_A Brand\";v=\"99\", \"Google Chrome\";v=\"109\", \"Chromium\";v=\"109\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "upgrade-insecure-requests": "1",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "sec-fetch-site": "none",
        "sec-fetch-mode": "navigate",
        "sec-fetch-user": "?1",
        "sec-fetch-dest": "document",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "cookie": "sIRTFrontend=remove",
        "if-none-match": "W/\"c-Lve95gjOVATpfV8EL5X4nxwjKHE\""
    },
    "hostname": "localhost",
    "url": "/",
    "params": {},
    "body": {}
}
```