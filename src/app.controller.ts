import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { GetHelloDto } from './getHello.dto';
import { NotEmptyPayloadPipe } from './validations/NotEmptyPayload.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  // use the nest.js default validation pipe for validation
  // enable the transformation via set transform option to true
  // in transformation process, redundant fields will be stripped out if you enable whitelist
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  getHello(
    // client will need to provide at least one field in the DTO
    @Body(new NotEmptyPayloadPipe())
    getHelloDto: GetHelloDto,
  ): string {
    const name = getHelloDto.firstName ?? getHelloDto.lastName;
    return `Hello ${name}`;
  }
}
