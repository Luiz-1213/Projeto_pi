export interface ITokenPayload {
  id: number;
  nome: string;
  tipoUsuario: string;
  iat?: number;
  exp?: number;
}