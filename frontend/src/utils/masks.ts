import dayjs from "dayjs";
export const normalizePhoneNumber = (value: string | undefined) => {
  if (!value) return "";

  return value
    .replace(/[\D]/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})(\d+?)/, "$1");
};

export const normalizeCPF = (value: string | undefined) => {
  if (!value) return "";

  return value
    .replace(/[\D]/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .slice(0, 14);
};

export const normalizeDate = (date: string) => {
  return dayjs(date).format("DD/MM/YYYY");
};

const parentescoMap: Record<string, string> = {
  mae: "Mãe",
  pai: "Pai",
  avo: "Avó",
  avo_materno: "Avó Materno",
  avo_paterno: "Avô Paterno",
  tio: "Tio",
  tia: "Tia",
};

export const normalizeKinship = (relacao: string): string => {
  return parentescoMap[relacao.toLowerCase()] || relacao;
};
