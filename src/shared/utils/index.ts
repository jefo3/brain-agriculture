import { cpf, cnpj } from "cpf-cnpj-validator";

const validateCPF = (cpfString: string): boolean => {
  return cpf.isValid(cpfString);
};

const validateCNPJ = (cnpjString: string): boolean => {
  return cnpj.isValid(cnpjString);
};

export const valitadeCpfOrCnpj = (cpfCnpj: string): void => {
  const cpfCnpjLength = cpfCnpj.replace(/[^\d]+/g, "").length;

  switch (cpfCnpjLength) {
    case 11:
      if (!validateCPF(cpfCnpj)) {
        throw new Error("CPF invalid");
      }
      break;
    case 14:
      if (!validateCNPJ(cpfCnpj)) {
        throw new Error("CNPJ invalid");
      }
      break;
    default:
      throw new Error("CPF/CNPJ invalid");
  }
};
interface IProps {
  farmArea: number;
  agriculturalArea: number;
  vegetationArea: number;
}

export const isFarmAreasValid = ({
  farmArea,
  agriculturalArea,
  vegetationArea,
}: IProps): boolean => {
  return agriculturalArea + vegetationArea <= farmArea;
};

export const formatPercentage = (value: number): number => {
  return Number((value * 100).toFixed(2));
};
