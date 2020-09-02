# Introdução

O teor deste desafio é bastante voltado a alguns problemas que resolvemos com frequência, e vai nos ajudar a descobrir como você raciocina e quais são suas habilidades.

Como constantemente precisamos pensar em formas diferentes de resolver os desafios que enfrentamos, acreditamos que uma base teórica sólida é mais importante que apenas ser bom em uma linguagem ou framework. Além disso queremos ver o seu melhor, e por isso não é preciso ficar limitado às tecnologias exigidas na descrição da vaga.

# O desafio

O desafio consiste em 2 problemas técnicos parecidos com os que enfrentamos na vida real.
A resolução deles não necessariamente requer a implementação de um mega-projeto, porém ambos precisam de um certo conhecimento para serem resolvidos.

Leia atentamente os enunciados dos problemas, pois apesar de não haver nenhuma pegadinha, os detalhes importam.

Outros requisitos do projeto incluem:
- Deve funcionar em um ambiente Linux
- Deve ter testes automatizados
- Deve ter um README explicando como instalar as dependências, executar as soluções e os testes.

Também sugerimos que o projeto seja organizado de uma forma parecida com esta:

```
part-1/
    src/
    test/
part-2/
    src/
    test/
README.md
```

## Parte 2 - Agregador de URLs

Recebemos um dump com lista de URLs de imagens de produtos que vamos utilizar para manter nossa base de dados atualizada.
Este dump contém imagens de milhões de produtos e URLs, e é atualizado a cada 10 minutos:

```json
{"productId": "pid2", "image": "http://www.linx.com/6.png"}
{"productId": "pid1", "image": "http://www.linx.com/1.png"}
{"productId": "pid1", "image": "http://www.linx.com/2.png"}
{"productId": "pid1", "image": "http://www.linx.com/7.png"}
{"productId": "pid1", "image": "http://www.linx.com/3.png"}
{"productId": "pid1", "image": "http://www.linx.com/1.png"}
{"productId": "pid2", "image": "http://www.linx.com/5.png"}
{"productId": "pid2", "image": "http://www.linx.com/4.png"}
```

As URLs pertencem a uma empresa terceirizada que hospeda a maioria destas imagens, e ela nos cobra um valor fixo por cada request.
Já sabemos que o dump de origem não tem uma boa confiabilidade, pois encontramos várias imagens repetidas e boa parte delas também retornam status 404.
Como não é interessante atualizar nossa base com dados ruins, precisamos enviar apenas com URLs que retornam status 200.
O processo de atualização ocorre também através de um dump, onde o formato é ligeiramente diferente da entrada:

```json
{"productId": "pid1", "images": ["http://www.linx.com/1.png", "http://www.linx.com/2.png", "http://www.linx.com/7.png"]}
{"productId": "pid2", "images": ["http://www.linx.com/3.png", "http://www.linx.com/5.png", "http://www.linx.com/6.png"]}
```

Para diminuir a quantidade de requests necessárias para validar as URLs, decidimos limitar a quantidade de imagens por produto em até 3.
O seu objetivo é criar um software que gera o dump agregado no menor tempo possível e com o mínimo de requests desnecessárias (já que existe um custo fixo por requisição).

O arquivo [input-dump.gz](./input-dump.gz) é um exemplo do dump de entrada. E você pode pode usá-lo para testar sua implementação.
Também criamos uma api que responde as URLs do `input-dump.gz`. Ela é apenas um mock, mas vai te ajudar a implementar a solução do desafio. Para executá-la, basta:

```shell
gem install sinatra
ruby url-aggregator-api.rb
```
