#### Desafio 5-1: Refatorando aplicação e configurando o BD
“Querer vencer significa já ter percorrido metade do caminho.”

🚀 Sobre o desafio
Esse é o primeiro desafio de uma sequência que irá implementar o banco de dados na aplicação desenvolvida no módulo anterior.

Nessa etapa, você deve refatorar o código da sua aplicação e preparar o seu ambiente para trabalhar com banco de dados.

Criando Banco de dados

[x] - Utilizando a ferramenta postbird, crie através de queries um banco de dados chamado my_teacher e uma tabela com o nome de teachers que possua os seguintes campos:

id: INT e PRIMARY KEY;
avatar_url: TEXT e NOT NULL;
name: TEXT e NOT NULL;
birth_date: TIMESTAMP e NOT NULL;
education_level: TEXT e NOT NULL;
class_type: TEXT e NOT NULL;
subjects_taught: TEXT e NOT NULL;
created_at: TIMESTAMP e NOT NULL.

Dicas: Para criar a tabela a partir de uma query, basta selecionar o banco no postbird e na aba Query rodar o comando CREATE TABLE especificando o nome da tabela e em seguida as colunas, por exemplo:

CREATE TABLE TEST(
   ID INT PRIMARY KEY,
   NAME TEXT NOT NULL
);

Para mais informações, dê uma olhada nesse link

Refatorando o Código

[x] - Após preparar o banco de dados, é preciso refatorar a sua aplicação para utilizá-lo. Você deve fazer as seguintes alterações:

[x] - Utilizar a nova estrutura de pastas (src, app e lib);
[x] - Corrija nos arquivos os caminhos relativos que precisar;
[x] - Utilize nos arquivos da pasta controllers a nova forma de exportar.

Configurando BD na aplicação

[x] - Por fim, instale a biblioteca pg e crie o arquivo de configuração do seu banco de dados (em uma pasta config) utilizando o Pool. Não esqueça de passar os dados necessários (user, password, host, port e database) na hora de instanciar (new) o Pool.

Estilização
Você tem liberdade para escolher a estilização que preferir para esse desafio.

📆 Entrega
Esse desafio não precisa ser entregue e não receberá correção. Após concluí-lo, adicionar esse código ao seu Github é uma boa forma de demonstrar seus conhecimentos para oportunidades futuras.

📝 Licença
Esse projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

#### Desafio 5-2: Interagindo com o BD
“Não basta saber, é preferível saber aplicar. Não é o bastante querer, é preciso saber querer.”

🚀 Sobre o desafio
Nessa etapa, você deve refatorar os CRUDs dos professores e estudantes para que eles utilizem o banco de dados.

Inserindo dados

[x] - No método post, construa uma query usando INSERT que crie um novo registro no banco de dados.

Buscando dados

[x] - No método index, construa uma query usando SELECT que retorne todos os registros do banco de dados. Ordene esses resultados pelo nome de forma crescente.

Criando Model

[x] - As operações com o banco de dados não devem ficar no controller, por isso crie um model que contenha os cinco métodos:

[x] - all: Buscar todos os registros;
[x] - create: Criar um registro;
[x] - find: Buscar apenas um registro a partir do id informado;
[x] - update: Atualiza um registro a partir do id informado;
[x] - delete: Remove um registro a partir do id informado;

Atualizando dados

[x] - Crie um método update no model. Nesse método, construa uma query utilizando UPDATE, SET e WHERE que atualiza um registro do banco de dados a partir do id informado.

Removendo dados

[x] - Crie um método delete no model. Nesse método, construa uma query utilizando DELETE e WHERE que remova um registro do banco de dados a partir do id informado.

Refatorando students

[x] - Refatore o controller de estudantes utilizando as mesmas ideias aplicadas no controller de professores.

Estilização

[x] - Você tem liberdade para escolher a estilização que preferir para esse desafio.

📆 Entrega
Esse desafio não precisa ser entregue e não receberá correção. Após concluí-lo, adicionar esse código ao seu Github é uma boa forma de demonstrar seus conhecimentos para oportunidades futuras.

📝 Licença
Esse projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

#### Desafio 5-3: Relacionamentos e filtros no BD
“Quer você acredite que consiga fazer uma coisa ou não, você está certo.”

🚀 Sobre o desafio
[] - Nessa etapa, você deve criar um relacionamento entre o professor e o estudante. Além disso, deve-se implementar filtros na listagem da tabela de professores.

- Relacionamentos

[x] - Adicione um campo teacher_id na tabela de estudantes. Em seguida, nas páginas de cadastro e edição de estudantes adicione um campo select que lista todos os professores cadastrados. Por fim, na página de detalhe de um estudante, crie um campo que mostre o o nome do professor do aluno.

- Filtros

[x] - Na página de listagem de professores,adicione um input de texto para os filtros e um botão para retornar uma nova listagem com os dados filtrados. No método index do controller, faça uma verificação para checar se existem filtros passados por query params. Se existir, crie um método findBy no model que retorna todos os professores que que tiverem o nome ou a área de atuação em comum com o filtro passado (utilize o ILIKE).

- Estilização
[x] - Você tem liberdade para escolher a estilização que preferir para esse desafio.


#### Desafio 5-4: Paginação de resultados no BD

“Não compare o seu bastidor com o palco do outro!”

🚀 Sobre o desafio

[] - Nessa etapa, você deve implementar a lógica de paginação dos resultados do BD.


## Backend

[x] - Adicione no método index do controller de professores o tratamento dos campos page e limit que serão transmitidos via query params. Além disso, faça o cálculo do offset a ser passado para a query. Por fim, crie um novo método paginate no model que deve implementar toda a query já existente (com filter e order) e também adicionar a paginação (utilize LIMIT e OFFSET).

## Frontend

[x] - Crie um algoritmo que realize a paginação dos resultados da seguinte forma:

* - As duas primeiras e últimas páginas sempre devem ser apresentadas (ex: 1, 2, 45 e 46 de um total de 46 pags.);
* - Caso existam mais de 7 páginas, as intermediárias selecionadas devem ser apresentadas juntamente com seu sucessor e antecessor (ex.: 1, 2, ..., 12, 13 (selecionada), 14, ..., 23, 24);
* - Só apresente as reticências se elas representarem um grupo de 2 páginas ou mais (ex.: 1, 2, 3 (sem reticências), 4, 5 (selecionada), 6, ...(pags 7 e 8), 9, 10).

[x] - Em seguida, implemente na query do método paginate no model de professor a lógica da paginação:

* - realizar o count de todos os registros de professores (utilize uma subquery);
* - aplicar os filtros tanto na query de busca dos professores quanto na subquery de count.

[x] - Por fim, utilize o scripts.js para renderizar no html (não faça no nunjucks) a paginação ao final da listagem (não esqueça que as reticências não devem ser links).

## Ajustes finais

[x] - Para finalizar, basta:

* - Estilizar a paginação;
* - Preservar o filter quando a página for alterada;
* - Implementar no front dos estudantes a paginação (siga a mesma ideia aplicada nos professores).

## Estilização

[x] - Você tem liberdade para escolher a estilização que preferir para esse desafio.



