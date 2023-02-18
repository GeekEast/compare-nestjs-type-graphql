## Validation and Transformation

- [Validation and Transformation](#validation-and-transformation)
  - [Install](#install)
  - [Send Request](#send-request)
  - [How does Nest.js compose validation and transformation?](#how-does-nestjs-compose-validation-and-transformation)
  - [3 ways to enable validation](#3-ways-to-enable-validation)
  - [Add Custom Validation](#add-custom-validation)


### Install
```sh
npm i --save class-validator class-transformer
```

### Send Request
```sh
# send lastName only
curl --location 'localhost:3000' \
--header 'Content-Type: application/json' \
--data '{"lastName": "Cool"}'

# send lastName only
curl --location 'localhost:3000' \
--header 'Content-Type: application/json' \
--data '{"firstName": "Mask"}'

# send empty payload
curl --location 'localhost:3000' \
--header 'Content-Type: application/json' \
--data '{}'
```

### How does Nest.js compose validation and transformation?
In Nest.js default `ValidationPipe`, it will use this order to compose validation and transformation:
- execute transformation
- execute validation
  

Find out more at [source code](https://github.com/nestjs/nest/blob/master/packages/common/pipes/validation.pipe.ts)

### 3 ways to enable validation

- globally in `main.ts`
```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // here 👇🏻
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  await app.listen(3000);
}
bootstrap();
```
- as a class method decorator
```typescript
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  // here 👇🏻
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  getHello(@Body() getHelloDto: GetHelloDto): string {
    return `Hello ${getHelloDto.name}`;
  }
}
```
- inside a method field decorator
```typescript
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  getHello(
    // here 👇🏻
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    getHelloDto: GetHelloDto,
  ): string {
    return `Hello ${getHelloDto.name}`;
  }
}
```

### Add Custom Validation

**Situation A**: All fields of DTO are optional, but you requires the DTO to provide at least one fields to pass the validation.

**Solution**:
```typescript
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class NotEmptyPayloadPipe implements PipeTransform<any> {
  transform(payload: any): any {
    if (!Object.keys(payload).length) {
      throw new BadRequestException('Payload should not be empty');
    }
    return payload;
  }
}
```