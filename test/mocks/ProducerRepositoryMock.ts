import { IProducerRepository } from "@repositories/IProducersRepository";

// Crie uma classe que estende a ProducerRepository e substitua os métodos necessários
export class ProducerRepositoryMock implements IProducerRepository {
  create = jest.fn();
  list = jest.fn();
  delete = jest.fn();
  update = jest.fn();
  getProducerByCpforCnpj = jest.fn();
  getProducerById = jest.fn();
  getTotalNumberOfFarms = jest.fn();
  getTotalAreaOfFarms = jest.fn();
  getGroupByState = jest.fn();
  getGroupByCrop = jest.fn();
  getAreaLandUse = jest.fn();
}
