import { typeShortResponsible } from "./IResponsibleResponse";

export type typeShortPeopleTea = {
  dataNascimento: string;
  id: string;
  foto: string;
  nome: string;
  diagnostico: string;
};

// Interface para a resposta de PeopleTEA
export interface IPeopleTEAResponse {
  id: number;
  foto: string | undefined;
  nome: string;
  cpf: string;
  endereco: string;
  dataNascimento: string;
  genero: string;
  autorizacaoTratamento: number;
  diagnostico: string;
  grauTEA: string;
  comunicacao: string;
  observacao: string;
  idadeDiagnostico: number;
  medicacao: string;
  frequenciaUsoMedicacao: string;
  responsavel: number;
  ativo: boolean;
}

export interface IPeopleTEA {
  foto?: File | undefined;
  nome: string;
  cpf: string;
  endereco: string;
  dataNascimento: string;
  genero: string;
  autorizacaoTratamento: number;
  diagnostico: string;
  grauTEA: string;
  comunicacao: string;
  observacao: string;
  idadeDiagnostico: number;
  medicacao: string;
  frequenciaUsoMedicacao: string;
  responsavel: number;
}

export interface IPeopleTEAResponsibleResponse {
  usuario: IPeopleTEAResponse;
  responsavel: typeShortResponsible;
}
