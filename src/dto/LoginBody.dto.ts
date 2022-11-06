import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class LoginBody {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
