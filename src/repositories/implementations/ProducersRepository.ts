import { CreateProducerDTO } from "@dtos/createProducerDTO";
import { Producer } from "@entities/ProducerEntity";
import { PrismaClient } from "@prisma/client";
import {
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
}
