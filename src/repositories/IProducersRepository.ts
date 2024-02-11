import { CreateProducerDTO } from "@dtos/createProducerDTO";
import { UpdateProducerDTO } from "@dtos/updateProducerDTO";
import { Producer } from "@entities/ProducerEntity";
import { Crop } from "@prisma/client";

export interface IUpdate {
  data: UpdateProducerDTO;
  id: string;
}

export interface IGroupByState {
  _count: number;
  state: string;
}

export interface IGroupByCrop {
  _count: number;
  plantedCrops: [] | Crop[];
}

export interface IProducerRepository {
  create(data: CreateProducerDTO): Promise<Producer>;
  list(): Promise<Producer[]>;
  delete(id: string): Promise<Producer>;
  update({ data, id }: IUpdate): Promise<Producer>;
  getProducerByCpforCnpj(cpfCnpj: string): Promise<Producer>;
  getProducerById(id: string): Promise<Producer>;
  getTotalNumberOfFarms(): Promise<number>;
  getTotalAreaOfFarms(): Promise<number>;
  getGroupByState(): Promise<IGroupByState[]>;
  getGroupByCrop(): Promise<IGroupByCrop[]>;
  getAreaLandUse(): Promise<number>;
}
