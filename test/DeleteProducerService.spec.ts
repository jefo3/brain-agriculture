import "reflect-metadata";

import { AppError } from "@errors/AppError";
import { DeleteProducerService } from "@services/producer/DeleteProducerService";

import {
  idProducerDelete,
  idProducerDeleteInvalid,
  producerOutputDeleteMockSucess,
} from "./mocks/producerDeleteMockData";
import { ProducerRepositoryMock } from "./mocks/ProducerRepositoryMock";

describe("Delete producer", () => {
  let deleteProducerService: DeleteProducerService;
  let producerRepositoryMock: ProducerRepositoryMock;

  beforeAll(() => {
    producerRepositoryMock = new ProducerRepositoryMock();
    deleteProducerService = new DeleteProducerService(producerRepositoryMock);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should define DeleteProducerService", () => {
    expect(deleteProducerService).toBeDefined();
  });

  it("should be able to delete producer", async () => {
    producerRepositoryMock.getProducerById.mockReturnValue(
      Promise.resolve(producerOutputDeleteMockSucess),
    );

    producerRepositoryMock.delete.mockReturnValue(
      Promise.resolve(producerOutputDeleteMockSucess),
    );

    const response = await deleteProducerService.execute(idProducerDelete);

    expect(response).toEqual(producerOutputDeleteMockSucess);

    expect(producerRepositoryMock.getProducerById).toHaveBeenCalled();
    expect(producerRepositoryMock.delete).toHaveBeenCalled();

    expect(producerRepositoryMock.getProducerById).toHaveBeenCalledTimes(1);
    expect(producerRepositoryMock.delete).toHaveBeenCalledTimes(1);
  });

  it("Should not be able to delete a producer, because producer not already exists", async () => {
    try {
      producerRepositoryMock.getProducerById.mockReturnValue(
        Promise.resolve(null),
      );

      await deleteProducerService.execute(idProducerDeleteInvalid);

      expect(producerRepositoryMock.getProducerById).toHaveBeenCalled();
    } catch (err) {
      expect((err as AppError).message).toBe("Producer Not Exists");
    }
  });
});
