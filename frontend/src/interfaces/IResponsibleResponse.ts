export interface IResponsibleResponse {
  id: number;
  foto: string | undefined;
  nome: string;
  email: string;
  cpf: string;
  endereco: string;
  genero: string;
  parentesco: string;
  telefone: string;
  observacao: string;
  horarioDisponivel: string;
  dataNascimento: string;
  contatoEmergencia: string;
  tipoUsuario: string;
}

export interface IResponsible {
  nome: string;
  cpf: string;
  email: string;
  dataNascimento: string;
  endereco: string;
  genero: string;
  parentesco: string;
  telefone: string;
  contatoEmergencia: string;
  horarioDisponivel: string;
  foto?: File | undefined;
  senha?: string | undefined;
  confirmasenha?: string | undefined;
  observacao?: string | undefined;
}

// Tipo para o responsável
export type typeShortResponsible = {
  id: number;
  nome: string;
  endereco: string;
  telefone: string;
  contatoEmergencia: string;
  parentesco: string;
};
