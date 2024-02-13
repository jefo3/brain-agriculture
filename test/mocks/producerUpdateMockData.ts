import { UpdateProducerDTO } from "@dtos/updateProducerDTO";

export const idProducerUpdate = "043c53ee-c870-41d9-a8a3-b218f3762cee";
export const idProducerUpdateInvalid = "1111";

export const producerOutputUpdateMockBase = {
  id: "043c53ee-c870-41d9-a8a3-b218f3762cee",
  cpfCnpj: "928.311.890-12",
  nameProducer: "producer mock",
  nameFarm: "fazenda mock",
  city: "São paulo",
  state: "São paulo",
  totalFarmArea: 2000,
  agriculturalArea: 1000,
  vegetationArea: 1000,
  plantedCrops: ["soja"],
  createdAt: "2024-02-12T17:33:15.120Z",
  updatedAt: "2024-02-12T17:33:15.120Z",
};

export const producerInputUpdateNamesMockSucess: UpdateProducerDTO = {
  nameProducer: "producer mock update",
  nameFarm: "fazenda mock update",
};

export const producerOutputUpdateNamesMockSucess = {
  id: "043c53ee-c870-41d9-a8a3-b218f3762cee",
  cpfCnpj: "928.311.890-12",
  nameProducer: "producer mock update",
  nameFarm: "fazenda mock update",
  city: "São paulo",
  state: "São paulo",
  totalFarmArea: 2000,
  agriculturalArea: 1000,
  vegetationArea: 1000,
  plantedCrops: ["soja"],
  createdAt: "2024-02-12T17:33:15.120Z",
  updatedAt: "2024-02-12T17:33:15.120Z",
};

export const producerInputUpdateRegionMockSucess: UpdateProducerDTO = {
  city: "Quixada",
  state: "Ceara",
};

export const producerOutputUpdateRegionMockSucess = {
  id: "043c53ee-c870-41d9-a8a3-b218f3762cee",
  cpfCnpj: "928.311.890-12",
  nameProducer: "producer mock",
  nameFarm: "fazenda mock",
  city: "Quixada",
  state: "Ceara",
  totalFarmArea: 2000,
  agriculturalArea: 1000,
  vegetationArea: 1000,
  plantedCrops: ["soja"],
  createdAt: "2024-02-12T17:33:15.120Z",
  updatedAt: "2024-02-12T17:33:15.120Z",
};

export const producerInputUpdateMockNameInvalid: UpdateProducerDTO = {
  nameProducer: "teste",
};

export const producerInputUpdateMockCpfInvalid: UpdateProducerDTO = {
  cpfCnpj: "928.311.890-88",
};

export const producerInputUpdateMockCNPJInvalid: UpdateProducerDTO = {
  cpfCnpj: "25.039.861/0001-07",
};

export const producerInputUpdateMockCPForCNPJIncomplete: UpdateProducerDTO = {
  cpfCnpj: "250.039.861",
};

export const producerInputUpdateMockAreaFarmInvalid: UpdateProducerDTO = {
  totalFarmArea: 2000,
  agriculturalArea: 4000,
  vegetationArea: 3000,
};
