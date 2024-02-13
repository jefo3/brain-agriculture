import { CreateProducerDTO } from "@dtos/createProducerDTO";

export const producerInputCreateMockSucess: CreateProducerDTO = {
  cpfCnpj: "928.311.890-12",
  nameProducer: "prucer mock",
  nameFarm: "fazeenda mock",
  city: "São paulo",
  state: "São paulo",
  totalFarmArea: 2000,
  agriculturalArea: 1000,
  vegetationArea: 1000,
  plantedCrops: ["soja"],
};

export const producerOutputCreateMockSucess = {
  id: "043c53ee-c870-41d9-a8a3-b218f3762cee",
  cpfCnpj: "928.311.890-12",
  nameProducer: "prucer mock",
  nameFarm: "fazeenda mock",
  city: "São paulo",
  state: "São paulo",
  totalFarmArea: 2000,
  agriculturalArea: 1000,
  vegetationArea: 1000,
  plantedCrops: ["soja"],
  createdAt: "2024-02-12T17:33:15.120Z",
  updatedAt: "2024-02-12T17:33:15.120Z",
};

export const producerInputCreateMockCpfInvalid: CreateProducerDTO = {
  cpfCnpj: "928.311.890-88",
  nameProducer: "prucer mock",
  nameFarm: "fazeenda mock",
  city: "São paulo",
  state: "São paulo",
  totalFarmArea: 2000,
  agriculturalArea: 1000,
  vegetationArea: 1000,
  plantedCrops: ["soja"],
};

export const producerInputCreateMockCNPJInvalid: CreateProducerDTO = {
  cpfCnpj: "25.039.861/0001-07",
  nameProducer: "prucer mock",
  nameFarm: "fazeenda mock",
  city: "São paulo",
  state: "São paulo",
  totalFarmArea: 2000,
  agriculturalArea: 1000,
  vegetationArea: 1000,
  plantedCrops: ["soja"],
};

export const producerInputCreateMockCPForCNPJIncomplete: CreateProducerDTO = {
  cpfCnpj: "250.039.861",
  nameProducer: "prucer mock",
  nameFarm: "fazeenda mock",
  city: "São paulo",
  state: "São paulo",
  totalFarmArea: 2000,
  agriculturalArea: 1000,
  vegetationArea: 1000,
  plantedCrops: ["soja"],
};

export const producerInputCreateMockAreaFarmInvalid: CreateProducerDTO = {
  cpfCnpj: "928.311.890-12",
  nameProducer: "prucer mock",
  nameFarm: "fazeenda mock",
  city: "São paulo",
  state: "São paulo",
  totalFarmArea: 2000,
  agriculturalArea: 1000,
  vegetationArea: 3000,
  plantedCrops: ["soja"],
};
