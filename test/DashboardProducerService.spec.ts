import "reflect-metadata";

import { DashboardProducerService } from "@services/producer/DashboardProducerService";

import {
  areaLandUseOutputMock,
  dashboardOutputMock,
  groupByCropOutputMock,
  groupByStateOutputMock,
  totalAreaOfFarmsOutputMock,
  totalNumberOfFarmsOutputMock,
} from "./mocks/producerDashboadrMockData";
import { ProducerRepositoryMock } from "./mocks/ProducerRepositoryMock";

describe("Dashboard producer", () => {
  let dashboardProducerService: DashboardProducerService;
  let producerRepositoryMock: ProducerRepositoryMock;

  beforeAll(() => {
    producerRepositoryMock = new ProducerRepositoryMock();
    dashboardProducerService = new DashboardProducerService(
      producerRepositoryMock,
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should define ListProducerService", () => {
    expect(dashboardProducerService).toBeDefined();
  });

  it("should to be viewr dashboard of producers", async () => {
    producerRepositoryMock.getGroupByCrop.mockReturnValue(
      groupByCropOutputMock,
    );
    producerRepositoryMock.getGroupByState.mockReturnValue(
      groupByStateOutputMock,
    );
    producerRepositoryMock.getTotalAreaOfFarms.mockReturnValue(
      totalAreaOfFarmsOutputMock,
    );
    producerRepositoryMock.getTotalNumberOfFarms.mockReturnValue(
      totalNumberOfFarmsOutputMock,
    );
    producerRepositoryMock.getAreaLandUse.mockReturnValue(
      areaLandUseOutputMock,
    );

    const response = await dashboardProducerService.execute();

    expect(response).toEqual(dashboardOutputMock);

    expect(producerRepositoryMock.getGroupByCrop).toHaveBeenCalled();
    expect(producerRepositoryMock.getGroupByState).toHaveBeenCalled();
    expect(producerRepositoryMock.getTotalAreaOfFarms).toHaveBeenCalled();
    expect(producerRepositoryMock.getTotalNumberOfFarms).toHaveBeenCalled();
    expect(producerRepositoryMock.getAreaLandUse).toHaveBeenCalled();

    expect(producerRepositoryMock.getGroupByCrop).toHaveBeenCalledTimes(1);
    expect(producerRepositoryMock.getGroupByState).toHaveBeenCalledTimes(1);
    expect(producerRepositoryMock.getTotalAreaOfFarms).toHaveBeenCalledTimes(1);
    expect(producerRepositoryMock.getTotalNumberOfFarms).toHaveBeenCalledTimes(
      1,
    );
    expect(producerRepositoryMock.getAreaLandUse).toHaveBeenCalledTimes(1);
  });
});
