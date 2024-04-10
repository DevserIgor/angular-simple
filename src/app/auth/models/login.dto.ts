export class LoginDTO {
 constructor(
  public readonly email: string | null,
  public readonly password: string | null
 ){}
}