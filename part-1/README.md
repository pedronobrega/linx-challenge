# API de Produtos

## Requisitos

Para rodar essa API localmente, os requerimentos sao:

- node package manager (ex: npm ou yarn)
- bash
- docker
- docker-compose

## Execucao

### Rodar o Servidor

Os comandos abaixo devem ser executado em seu terminal para colocar o servi'co no ar:

```bash
cd part-1
bash build.sh
bash start.sh
```

### Rodar testes unit'arios

Usando yarn:

```bash
cd part-1
yarn
yarn test
```

Usando npm:

```bash
cd part-1
npm install
npm run test
```

## Defini'c~oes

Esta API suporta requisi'c~oes do tipo:

```bash
GET => http://localhost/ping
POST => http://localhost/products
```

Para executar comandos via cURL, 'e preciso especificar o Content-type no header, como abaixo:

```bash
curl -XPOST -H "Content-Type: application/json" http://localhost/products --data '[{"id": "123", "name": "mesa"},{"id": "124", "name": "cadeira"}]'
```

## Parte 1 - API de produtos

Precisamos de uma API para receber a atualização de dados cadastrais de produtos. Ela deve receber um corpo no formato JSON, onde o tamanho varia desde alguns poucos Kb até alguns Gb.
Experiências anteriores mostram que alguns clientes costumam enviar o mesmo corpo repetidas vezes ao longo de um curto espaço de tempo.
Isso nos causou alguns problemas, como o fato de ter que escalar nossos bancos de dados muito além do necessário afim de aguentar a carga extra desnecessária.
Para evitar que isto ocorra, precisamos que esta API negue requisições que tem o mesmo corpo num intervalo de 10 minutos.

Aqui está um exemplo do comportamento esperado:

```bash
# 2018-03-01T13:00:00 - primeira requisição, durante 10 minutos requests com o mesmo corpo serão negadas
curl -XPOST http://your-api.chaordic.com.br/v1/products -d '[{"id": "123", "name": "mesa"}]' #=> 200 OK

# 2018-03-01T13:09:59 - mesmo corpo que a request anterior.
curl -XPOST http://your-api.chaordic.com.br/v1/products -d '[{"id": "123", "name": "mesa"}]' #=> 403 Forbidden

# 2018-03-01T13:10:00 - agora a API deve voltar a aceitar o corpo
curl -XPOST http://your-api.chaordic.com.br/v1/products -d '[{"id": "123", "name": "mesa"}]' #=> 200 OK
```

Como esta API atenderá milhares de requisições simultâneas, ela precisa funcionar em um cluster.
É esperado que o comportamento descrito acima se mantenha, independente do nó que receber a requisição.
