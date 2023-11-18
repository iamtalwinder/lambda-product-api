import { IsNotEmpty, IsString } from 'class-validator';
import { EnvironmentInterface } from './environment.interface';

export class EnvironmentDto implements EnvironmentInterface {
  @IsString()
  @IsNotEmpty()
  public userPoolId: string;

  @IsString()
  @IsNotEmpty()
  public userPoolClientId: string;
}
