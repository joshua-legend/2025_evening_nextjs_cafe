import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateGuestbookDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  content: string;
}
