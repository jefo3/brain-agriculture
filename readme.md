# Requisitos de negócio
* O usuário deverá ter a possibilidade de cadastrar, editar, e excluir produtores rurais.
* O sistema deverá validar CPF e CNPJ digitados incorretamente.
* A soma de área agrícultável e vegetação, não deverá ser maior que a área total da fazenda
* Cada produtor pode plantar mais de uma cultura em sua Fazenda.
* A plataforma deverá ter um Dashboard que exiba:
  * Total de fazendas em quantidade
  * Total de fazendas em hectares (área total)
  *  Gráfico de pizza por estado.
  * Gráfico de pizza por cultura.
  * Gráfico de pizza por uso de solo (Área agricultável e vegetação)


# Tecnologias utilizadas
* Typescrip
* Node
* Express
* Prisma
* PostgreSQL
* Docker-compose
* Swagger
* Jest
* Tsyringe

# Requisitos para executar o projeto
* [NodeJs](https://nodejs.org/): Certifique-se de instalar a versão 16 ou superior.

* [Yarn](https://yarnpkg.com/) ou [NPM](https://www.npmjs.com/package/npm): O Yarn geralmente é instalado junto com o Node.js

* [Git](https://git-scm.com/)

* [Docker](https://www.docker.com/)

* [Docker-compose](https://docs.docker.com/compose/install/)

# Como executar o projeto
1. Clone o projeto para sua máquina
```bash
git clone https://github.com/jefo3/brain-agriculture.git
```
2. Instalar as dependencias
```bash
yarn
or
npm install
```
3. Criar o arquivo .env
> Os dados necessários para o .env se encontra no arquivo .env.example
```bash
## BD
DATABASE_URL=

## Docker-Compose
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
```
4. Criar e executar o container do banco
```bash
docker-compose up -d
```
5. Gerar as migration, assim criando as tabelas no banco
```bash
yarn prisma migrate dev
or
npm run prisma mirgrate dev
```
6. Executar a API
```bash
yarn start:dev
or
npm run start:dev
```

# Documentação
A api está toda documentada no swagger, para ter acesso a documentação é so acessar:

```bash 
 http://localhost:3333/api-docs/
```
Caso queira, pode baixar o arquivo do insominia, onde todas as rotas estão montadas, pronta para uso:
> em docs existe um arquivo insominia-brain.json

# Duvias?
qualquer dúvida é so entrar em contato pelo email: [jeferson.goncalves.noronha@gmail.com](jeferson.goncalves.noronha@gmail.com)
