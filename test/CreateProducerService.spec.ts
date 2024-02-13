import "reflect-metadata";

import { AppError } from "@errors/AppError";
import { CreateProducerService } from "@services/producer/CreateProducerService";

import {
  producerInputCreateMockAreaFarmInvalid,
  producerInputCreateMockCNPJInvalid,
  producerInputCreateMockCpfInvalid,
  producerInputCreateMockCPForCNPJIncomplete,
  producerInputCreateMockSucess,
  producerOutputCreateMockSucess,
} from "./mocks/producerCreateMockData";
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
    producerRepositoryMock.getProducerByCpforCnpj.mockReturnValue(
      Promise.resolve(null),
    );
    producerRepositoryMock.create.mockReturnValue(
      Promise.resolve(producerOutputCreateMockSucess),
    );

    const response = await createProducerService.execute(
      producerInputCreateMockSucess,
    );

    expect(response).toEqual(producerOutputCreateMockSucess);
    expect(response).toHaveProperty("id");

    expect(producerRepositoryMock.getProducerByCpforCnpj).toHaveBeenCalled();
    expect(producerRepositoryMock.create).toHaveBeenCalled();

    expect(producerRepositoryMock.getProducerByCpforCnpj).toHaveBeenCalledTimes(
      1,
    );
    expect(producerRepositoryMock.create).toHaveBeenCalledTimes(1);
  });

  it("Should not be able to create a new producer, because CPF invalid", async () => {
    try {
      await createProducerService.execute(producerInputCreateMockCpfInvalid);
    } catch (err) {
      expect((err as AppError).message).toBe("CPF invalid");
    }
  });

  it("Should not be able to create a new producer, because CNPJ invalid", async () => {
    try {
      await createProducerService.execute(producerInputCreateMockCNPJInvalid);
    } catch (err) {
      expect((err as AppError).message).toBe("CNPJ invalid");
    }
  });

  it("Should not be able to create a new producer, because CPF or CNPJ invalid", async () => {
    try {
      await createProducerService.execute(
        producerInputCreateMockCPForCNPJIncomplete,
      );
    } catch (err) {
      expect((err as AppError).message).toBe("CPF/CNPJ invalid");
    }
  });

  it("Should not be able to create a new producer, because area farm is less of area agriculturalArea + vegetationArea", async () => {
    try {
      await createProducerService.execute(
        producerInputCreateMockAreaFarmInvalid,
      );
    } catch (err) {
      expect((err as AppError).message).toBe(
        "agriculturalArea next to vegetationArea cannot be greater than the total area of the farm",
      );
    }
  });

  it("Should not be able to create a new producer, because producer already exists", async () => {
    try {
      producerRepositoryMock.getProducerByCpforCnpj.mockReturnValue(
        Promise.resolve(producerOutputCreateMockSucess),
      );

      await createProducerService.execute(producerInputCreateMockSucess);

      expect(producerRepositoryMock.getProducerByCpforCnpj).toHaveBeenCalled();
    } catch (err) {
      expect((err as AppError).message).toBe("Producer already exists");
    }
  });
});
