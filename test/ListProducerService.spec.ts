import "reflect-metadata";

import { ListProducerService } from "@services/producer/ListProducerService";

import {
  listOutputMock,
  listOutputMockEmpty,
} from "./mocks/producerListMockData";
import { ProducerRepositoryMock } from "./mocks/ProducerRepositoryMock";

describe("List producer", () => {
  let listProducerService: ListProducerService;
  let producerRepositoryMock: ProducerRepositoryMock;

  beforeAll(() => {
    producerRepositoryMock = new ProducerRepositoryMock();
    listProducerService = new ListProducerService(producerRepositoryMock);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should define ListProducerService", () => {
    expect(listProducerService).toBeDefined();
  });

  it("should to be list all producers", async () => {
    producerRepositoryMock.list.mockReturnValue(listOutputMock);

    const response = await listProducerService.execute();

    expect(response).toEqual(listOutputMock);

    expect(producerRepositoryMock.list).toHaveBeenCalled();
    expect(producerRepositoryMock.list).toHaveBeenCalledTimes(1);
  });

  it("should to be list empty producers", async () => {
    producerRepositoryMock.list.mockReturnValue(listOutputMockEmpty);

    const response = await listProducerService.execute();

    expect(response).toEqual(listOutputMockEmpty);

    expect(producerRepositoryMock.list).toHaveBeenCalled();
    expect(producerRepositoryMock.list).toHaveBeenCalledTimes(1);
  });
});
