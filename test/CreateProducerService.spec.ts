import "reflect-metadata";

import { CreateProducerDTO } from "@dtos/createProducerDTO";
import { CreateProducerService } from "@services/producer/CreateProducerService";

import { ProducerRepositoryMock } from "./mocks/ProducerRepositoryMock";

describe("Create producer", () => {
  let createProducerService: CreateProducerService;
  let producerRepositoryMock: ProducerRepositoryMock;

  beforeAll(() => {
    producerRepositoryMock = new ProducerRepositoryMock();
    createProducerService = new CreateProducerService(producerRepositoryMock);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should define CreateProducerService", () => {
    expect(createProducerService).toBeDefined();
  });

  it("Shold be able to create a new producer", async () => {
    const producerInputMock: CreateProducerDTO = {
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

    const producerOutputMock = {
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

    producerRepositoryMock.getProducerByCpforCnpj.mockReturnValue(
      Promise.resolve(null),
    );
    producerRepositoryMock.create.mockReturnValue(
      Promise.resolve(producerOutputMock),
    );

    const response = await createProducerService.execute(producerInputMock);

    expect(response).toEqual(producerOutputMock);
    expect(response).toHaveProperty("id");

    expect(producerRepositoryMock.getProducerByCpforCnpj).toHaveBeenCalled();
    expect(producerRepositoryMock.create).toHaveBeenCalled();

    expect(producerRepositoryMock.getProducerByCpforCnpj).toHaveBeenCalledTimes(
      1,
    );
    expect(producerRepositoryMock.create).toHaveBeenCalledTimes(1);
  });
});
