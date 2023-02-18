import { Transform } from 'class-transformer';
import { IsOptional, MaxLength } from 'class-validator';

export class GetHelloDto {
  @IsOptional()
  @MaxLength(10)
  // capitalize the first letter
  @Transform(
    ({ value }: { value: string }) =>
      value.charAt(0).toUpperCase() + value.slice(1),
  )
  firstName: string;

  @IsOptional()
  @MaxLength(10)
  // capitalize the first letter
  @Transform(
    ({ value }: { value: string }) =>
      value.charAt(0).toUpperCase() + value.slice(1),
  )
  lastName: string;
}
