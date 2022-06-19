import { IsNotEmpty } from 'class-validator';

class registerInputInterface {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;
}

export { registerInputInterface };
