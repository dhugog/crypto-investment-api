# Crypto Investment - API para investimentos em criptomoedas

**Principais tecnologias utilizadas:** Node, Typescript, TypeORM, Express, PostgreSQL e Redis

### Setup

- Na pasta do projeto clonado, copie e cole o arquivo `.env.example`, renomeando-o para `.env`, e verificando as configurações como banco de dados e credenciais do Mailtrap
- Execute o comando `docker compose up -d` na pasta root do projeto

Após isso, aguarde um momento até que finalize as instalações e migrações, e a aplicação estará sendo servida na porta especificada no docker-compose (padrão 3333), do localhost.

### Documentação

A documentação no Postman poderá ser encontrada <a href="https://api.postman.com/collections/4348568-0fa3fc47-91b9-4382-822d-207eaf521aae?access_key=PMAT-01HYR82HKKC6821TK4Q9R0GQ15" target="_blank">aqui</a>

**Observação:** Por questões de precisão, todos valores monetários são armazenados em sua unidade minima/inteira. Ex.: _**R$ 1,50 = 150 centavos**_, _**0,05 BTC = 5.000.000 satoshis**_. Consequentemente, os valores obtidos na API para consulta de preço do Bitcoin, são em centavos por satoshi.
