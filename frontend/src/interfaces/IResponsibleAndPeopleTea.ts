import { typeShortPeopleTea } from "./IPeopleTEAResponse";
import { IResponsibleResponse } from "./IResponsibleResponse";

export interface IResponsibleAndPeopleTea extends IResponsibleResponse {
  PessoaTEA: typeShortPeopleTea[];
}
