import { CreateProducerDTO } from "@dtos/createProducerDTO";
import { UpdateProducerDTO } from "@dtos/updateProducerDTO";
import { Producer } from "@entities/ProducerEntity";

export interface IUpdate {
  data: UpdateProducerDTO;
  id: string;
}

export interface IProducerRepository {
  create(data: CreateProducerDTO): Promise<Producer>;
  list(): Promise<Producer[]>;
  delete(id: string): Promise<Producer>;
  update({ data, id }: IUpdate): Promise<Producer>;
  getProducerByCpforCnpj(cpfCnpj: string): Promise<Producer>;
  getProducerById(id: string): Promise<Producer>;
}
