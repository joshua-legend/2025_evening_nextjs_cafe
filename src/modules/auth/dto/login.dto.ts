import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty({ message: '아이디는 필수 입력값입니다.' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: '비밀번호는 필수 입력값입니다.' })
  password: string;
}
