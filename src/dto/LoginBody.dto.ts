import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class LoginBody {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
