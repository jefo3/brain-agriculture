import { inject, injectable } from "tsyringe";

import {
  IGroupByCrop,
  IGroupByState,
  IProducerRepository,
} from "@repositories/IProducersRepository";
import { formatPercentage } from "@shared/utils";

interface IDashboardData {
  totalFarms: number;
  totalAreaOfFarms: number;
  areaLandUse: number;
  groupByState: IGroupByState[];
  groupByCrop: IGroupByCrop[];
}

@injectable()
export class DashboardProducerService {
  private percentageStates: Record<string, number>;
  private percentageCrops: Record<string, number>;

  constructor(
    @inject("ProducersRepository")
    private producersRepository: IProducerRepository,
  ) {
    this.percentageStates = {};
    this.percentageCrops = {};
  }

  private async getAllDataForDashboard() {
    const promiseOfTotalAreaFarms =
      await this.producersRepository.getTotalAreaOfFarms();
    const promiseOfTotalFarms =
      await this.producersRepository.getTotalNumberOfFarms();
    const promiseGroupByState =
      await this.producersRepository.getGroupByState();
    const promiseGroupByCrop = await this.producersRepository.getGroupByCrop();
    const promiseAreaLandUse = await this.producersRepository.getAreaLandUse();

    const promisesOfDataDashboard: IDashboardData = {
      totalFarms: promiseOfTotalFarms,
      totalAreaOfFarms: promiseOfTotalAreaFarms,
      areaLandUse: promiseAreaLandUse,
      groupByState: promiseGroupByState,
      groupByCrop: promiseGroupByCrop,
    };

    const dashboardData: [IDashboardData] = await Promise.all([
      promisesOfDataDashboard,
    ]);

    return dashboardData;
  }

  private calculatePercentageOfState(groupByState: IGroupByState[]) {
    const totalCountStates = groupByState.reduce(
      (acc, item) => acc + item._count,
      0,
    );

    groupByState.forEach((element) => {
      const fractionState = element._count / totalCountStates;
      const percentageState = formatPercentage(fractionState);

      this.percentageStates[element.state] = percentageState;
    });
  }

  private calculateQuantityCrops(
    groupByCrop: IGroupByCrop[],
  ): Map<string, number> {
    const cropsQuantity = new Map<string, number>();

    groupByCrop.forEach((element) => {
      element.plantedCrops.forEach((crop) => {
        const alreadyHasValue = cropsQuantity.has(crop);

        if (alreadyHasValue) {
          const cropValue = cropsQuantity.get(crop);
          cropsQuantity.set(crop, element._count + cropValue);
        } else {
          cropsQuantity.set(crop, element._count);
        }
      });
    });

    return cropsQuantity;
  }

  private addPercentageForFarmsWithouCrop(
    totalCrops: number,
    totalCountByCrop,
  ) {
    const withoutCropQuantity = totalCountByCrop - totalCrops;
    const withoutCropPercentage = formatPercentage(
      withoutCropQuantity / totalCountByCrop,
    );
    this.percentageCrops.withoutCrop = withoutCropPercentage;
  }

  private calcultePercentageOfCrop(groupByCrop: IGroupByCrop[]) {
    const totalCountByCrop = groupByCrop.reduce(
      (acc, item) => acc + item._count,
      0,
    );

    const cropsQuantity = this.calculateQuantityCrops(groupByCrop);

    let totalCrops = 0;
    cropsQuantity.forEach((value, key) => {
      totalCrops += value;

      const fraction = value / totalCountByCrop;
      const percentageByState = formatPercentage(fraction);

      this.percentageCrops[key] = percentageByState;
    });

    this.addPercentageForFarmsWithouCrop(totalCrops, totalCountByCrop);
  }

  async execute() {
    const dashboardData = await this.getAllDataForDashboard();

    const fractionLandUse =
      dashboardData[0].areaLandUse / dashboardData[0].totalAreaOfFarms;
    const percentageByLandUse = formatPercentage(fractionLandUse);

    this.calculatePercentageOfState(dashboardData[0].groupByState);
    this.calcultePercentageOfCrop(dashboardData[0].groupByCrop);

    const dashboardDataResponse = {
      totalNumberOfFarms: dashboardData[0].totalFarms,
      totalAreaOfFarmsInHectares: dashboardData[0].totalAreaOfFarms,
      percentageByLandUse,
      percentageByState: this.percentageStates,
      percentageByCrop: this.percentageCrops,
    };

    return dashboardDataResponse;
  }
}
