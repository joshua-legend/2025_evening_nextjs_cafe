import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty({ message: '이름은 필수 입력값입니다.' })
  @MinLength(2, { message: '이름은 2글자 이상이어야 합니다.' })
  @MaxLength(20, { message: '이름은 20글자 이하여야 합니다.' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: '비밀번호는 필수 입력값입니다.' })
  @MinLength(8, { message: '비밀번호는 8자 이상이어야 합니다.' })
  @MaxLength(20, { message: '비밀번호는 20자 이하여야 합니다.' })
  password: string;
}
