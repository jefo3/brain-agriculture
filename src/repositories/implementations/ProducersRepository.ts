/* eslint-disable no-unsafe-optional-chaining */
import { CreateProducerDTO } from "@dtos/createProducerDTO";
import { Producer } from "@entities/ProducerEntity";
import { PrismaClient } from "@prisma/client";
import {
  IGroupByCrop,
  IGroupByState,
  IProducerRepository,
  IUpdate,
} from "@repositories/IProducersRepository";

export class ProducersRepository implements IProducerRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: CreateProducerDTO): Promise<Producer> {
    const producerCreated = await this.prisma.producer.create({
      data,
    });

    return producerCreated;
  }

  async list(): Promise<Producer[]> {
    const producers = await this.prisma.producer.findMany();
    return producers;
  }

  async delete(id: string): Promise<Producer> {
    const producerDeleted = await this.prisma.producer.delete({
      where: {
        id,
      },
    });

    return producerDeleted;
  }

  async update({ data, id }: IUpdate): Promise<Producer> {
    const producerUpdated = await this.prisma.producer.update({
      where: {
        id,
      },
      data,
    });

    return producerUpdated;
  }

  async getProducerByCpforCnpj(cpfCnpj: string): Promise<Producer> {
    const producer = await this.prisma.producer.findUnique({
      where: {
        cpfCnpj,
      },
    });

    return producer;
  }

  async getProducerById(id: string): Promise<Producer> {
    const producer = await this.prisma.producer.findUnique({
      where: {
        id,
      },
    });

    return producer;
  }

  async getTotalNumberOfFarms(): Promise<number> {
    const totalFarms = await this.prisma.producer.count();
    return totalFarms;
  }

  async getTotalAreaOfFarms(): Promise<number> {
    const totalArea = await this.prisma.producer.aggregate({
      _sum: {
        totalFarmArea: true,
      },
    });

    return totalArea._sum.totalFarmArea?.toNumber();
  }

  async getGroupByState(): Promise<IGroupByState[]> {
    const groupByStates = await this.prisma.producer.groupBy({
      by: ["state"],
      _count: true,
      orderBy: {
        _count: {
          state: "desc",
        },
      },
    });

    return groupByStates;
  }

  async getGroupByCrop(): Promise<IGroupByCrop[]> {
    const groupByCrops = await this.prisma.producer.groupBy({
      by: "plantedCrops",
      _count: true,
    });

    return groupByCrops;
  }

  async getAreaLandUse(): Promise<number> {
    const areaLanUse = await this.prisma.producer.aggregate({
      _sum: {
        agriculturalArea: true,
        vegetationArea: true,
      },
    });

    const total =
      areaLanUse._sum.agriculturalArea?.toNumber() +
      areaLanUse._sum.vegetationArea?.toNumber();

    return total;
  }
}
