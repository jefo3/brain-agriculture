import "reflect-metadata";

import { AppError } from "@errors/AppError";
import { UpdateProducerService } from "@services/producer/UpdateProducerService";

import { ProducerRepositoryMock } from "./mocks/ProducerRepositoryMock";
import {
  idProducerUpdate,
  idProducerUpdateInvalid,
  producerInputUpdateMockAreaFarmInvalid,
  producerInputUpdateMockCNPJInvalid,
  producerInputUpdateMockCPForCNPJIncomplete,
  producerInputUpdateMockCpfInvalid,
  producerInputUpdateNamesMockSucess,
  producerInputUpdateRegionMockSucess,
  producerOutputUpdateMockBase,
  producerOutputUpdateNamesMockSucess,
  producerOutputUpdateRegionMockSucess,
} from "./mocks/producerUpdateMockData";

describe("Update producer", () => {
  let updateProducerService: UpdateProducerService;
  let producerRepositoryMock: ProducerRepositoryMock;

  beforeAll(() => {
    producerRepositoryMock = new ProducerRepositoryMock();
    updateProducerService = new UpdateProducerService(producerRepositoryMock);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should define UpdateProducerService", () => {
    expect(updateProducerService).toBeDefined();
  });

  it("should be uptade name producer and name farm", async () => {
    producerRepositoryMock.getProducerById.mockReturnValue(
      Promise.resolve(producerOutputUpdateMockBase),
    );

    producerRepositoryMock.update.mockReturnValue(
      Promise.resolve(producerOutputUpdateNamesMockSucess),
    );

    const response = await updateProducerService.execute({
      data: producerInputUpdateNamesMockSucess,
      id: idProducerUpdate,
    });

    expect(response).toEqual(producerOutputUpdateNamesMockSucess);
    expect(response).toHaveProperty("id");
    expect(response.id).toEqual(idProducerUpdate);

    expect(producerRepositoryMock.getProducerById).toHaveBeenCalled();
    expect(producerRepositoryMock.update).toHaveBeenCalled();

    expect(producerRepositoryMock.getProducerById).toHaveBeenCalledTimes(1);
    expect(producerRepositoryMock.update).toHaveBeenCalledTimes(1);
  });

  it("should be uptade region(state and city) of producer", async () => {
    producerRepositoryMock.getProducerById.mockReturnValue(
      Promise.resolve(producerOutputUpdateMockBase),
    );

    producerRepositoryMock.update.mockReturnValue(
      Promise.resolve(producerOutputUpdateRegionMockSucess),
    );

    const response = await updateProducerService.execute({
      data: producerInputUpdateRegionMockSucess,
      id: idProducerUpdate,
    });

    expect(response).toEqual(producerOutputUpdateRegionMockSucess);
    expect(response).toHaveProperty("id");
    expect(response.id).toEqual(idProducerUpdate);

    expect(producerRepositoryMock.getProducerById).toHaveBeenCalled();
    expect(producerRepositoryMock.update).toHaveBeenCalled();

    expect(producerRepositoryMock.getProducerById).toHaveBeenCalledTimes(1);
    expect(producerRepositoryMock.update).toHaveBeenCalledTimes(1);
  });

  it("Should not be able to update a producer, because CPF invalid", async () => {
    try {
      await updateProducerService.execute({
        data: producerInputUpdateMockCpfInvalid,
        id: idProducerUpdate,
      });
    } catch (err) {
      expect((err as AppError).message).toBe("CPF invalid");
    }
  });

  it("Should not be able to update a producer, because CNPJ invalid", async () => {
    try {
      await updateProducerService.execute({
        data: producerInputUpdateMockCNPJInvalid,
        id: idProducerUpdate,
      });
    } catch (err) {
      expect((err as AppError).message).toBe("CNPJ invalid");
    }
  });

  it("Should not be able to upadate a producer, because CPF or CNPJ invalid", async () => {
    try {
      await updateProducerService.execute({
        data: producerInputUpdateMockCPForCNPJIncomplete,
        id: idProducerUpdate,
      });
    } catch (err) {
      expect((err as AppError).message).toBe("CPF/CNPJ invalid");
    }
  });

  it("Should not be able to update a producer, because area farm is less of area agriculturalArea + vegetationArea", async () => {
    try {
      producerRepositoryMock.getProducerById.mockReturnValue(
        Promise.resolve(producerOutputUpdateMockBase),
      );

      await updateProducerService.execute({
        data: producerInputUpdateMockAreaFarmInvalid,
        id: idProducerUpdate,
      });

      expect(producerRepositoryMock.getProducerById).toHaveBeenCalled();
    } catch (err) {
      expect((err as AppError).message).toBe(
        "agriculturalArea next to vegetationArea cannot be greater than the total area of the farm",
      );
    }
  });

  it("Should not be able to update a producer, because producer not already exists", async () => {
    try {
      producerRepositoryMock.getProducerById.mockReturnValue(
        Promise.resolve(null),
      );

      await updateProducerService.execute({
        data: producerInputUpdateNamesMockSucess,
        id: idProducerUpdateInvalid,
      });

      expect(producerRepositoryMock.getProducerById).toHaveBeenCalled();
    } catch (err) {
      expect((err as AppError).message).toBe("Producer Not Exists");
    }
  });
});
