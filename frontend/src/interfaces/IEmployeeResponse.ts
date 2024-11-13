export interface IEmployeeResponse {
  id: number;
  foto: string;
  email: string;
  nome: string;
  cpf: string;
  endereco: string;
  telefone: string;
  cargo: string;
  dataNascimento: string;
  horarioTrabalho: string;
  qtdCadastroEvento: number;
  voluntario: number;
}

export interface IEmployee {
  foto?: File | undefined;
  email: string;
  nome: string;
  cpf: string;
  endereco: string;
  telefone: string;
  cargo: string;
  dataNascimento: string;
  horarioTrabalho: string;
  qtdCadastroEvento: number;
  senha?: string | undefined;
  confirmasenha?: string | undefined;
  voluntario: number;
}
