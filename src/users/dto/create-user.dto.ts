import {
  IsDate,
  IsEmail,
  IsOptional,
  IsPostalCode,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  public primerNombre: string;

  @IsString()
  @IsOptional()
  public segundoNombre: string;

  @IsString()
  public primerApellido: string;

  @IsString()
  @IsOptional()
  public segundoApellido: string;

  @IsDate()
  public fechaNacimiento: Date;

  @IsString()
  public numeroCelular: string;

  @IsString()
  public numeroDocumento: string;

  @IsString()
  public telefonoCasa: string;

  @IsString()
  public direccion: string;

  @IsString()
  public ciudadDireccion: string;

  @IsString()
  public departamentoDireccion: string;

  @IsPostalCode()
  @IsOptional()
  public codigoPostalDireccion: string;

  @IsString()
  @IsOptional()
  public paisDireccion: string;

  @IsString()
  public estado: string;

  @IsEmail()
  @IsOptional()
  public email: string;

  @IsString()
  public especializacionEmpleo: string;
}
