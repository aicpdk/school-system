import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class SignupBody {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
