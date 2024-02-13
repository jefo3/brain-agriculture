export const dashboardOutputMock = {
  totalNumberOfFarms: 5,
  totalAreaOfFarmsInHectares: 10000,
  percentageByLandUse: 100,
  percentageByState: {
    "São paulo": 100,
  },
  percentageByCrop: {
    soja: 66.67,
    canaDeAcucar: 16.67,
    algodao: 16.67,
    withoutCrop: 0,
  },
};

export const groupByCropOutputMock = [
  { _count: 1, plantedCrops: ["soja", "canaDeAcucar"] },
  { _count: 1, plantedCrops: ["soja", "algodao"] },
  { _count: 1, plantedCrops: [] },
  { _count: 2, plantedCrops: ["soja"] },
];

export const groupByStateOutputMock = [{ _count: 5, state: "São paulo" }];

export const totalAreaOfFarmsOutputMock = 10000;

export const totalNumberOfFarmsOutputMock = 5;

export const areaLandUseOutputMock = 10000;
