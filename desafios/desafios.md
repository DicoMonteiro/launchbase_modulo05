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


#### Desafio 4-4: Apresentação, edição e formatação dos dados de um professor
“Comece fazendo o que é necessário, depois o que é possível, e de repente você estará fazendo o impossível.”

🚀 Sobre o desafio

[x] - Nessa etapa você deve criar duas rotas: uma para apresentar os dados do professor (show) e outra para a edição dos dados cadastrados (edit). Além disso, realize a formatação dos dados cadastrados para a correta exibição no HTML

## SHOW

[x] - Crie uma rota para lidar com a apresentação dos dados cadastrados de um professor. Dentro do arquivo 'teachers.js', crie um método 'show' para buscar e retornar o professor a partir do 'id' fornecido na rota. Os seguintes dados precisam ser formatados:

[x] - Idade: Crie um arquivo utils.js que exporta uma função chamada 'age'. Essa função deve retornar a idade a partir do parâmetro (data de nascimento) informado;
[x] - Grau de escolaridade: crie uma função 'graduation' no arquivo 'utils.js'. Essa função deve retornar o grau de escolaridade formatado a partir do valor do select informado (ex.: Ensino Médio Completo para o valor medio do 'select');
[x] - Acompanhamento: Utilize o método 'split' da string para gerar um array com as matérias que o professor leciona;
[x] - Desde: Utilize o constructor 'Intl' e seus métodos para gerar uma data no formato 'dia/mes/ano'.

[x] - Ao fim da apresentação dos dados, crie um link que irá redirecionar para a rota de edição dos dados cadastrados.

## Edição

[x] - Crie uma rota para lidar com a edição dos dados cadastrados de um professor. Dentro do arquivo 'teachers.js', crie um método 'edit' para buscar e retornar o professor a partir do 'id' fornecido na rota. Utilize a mesma interface da rota de apresentação dos dados do professor (lembrando de fazer o reaproveitamento do form com um arquivo 'fields.njk'). 

[x] - Por fim, crie uma função chamada date no arquivo utils.js. Essa função deve retornar a data no formato yyyy-mm-dd para a correta exibição no input do tipo date no HTML (lembre de tratar os dias e meses menores que 10 utilizando o método 'splice' da string).

Estilização

[x] - Você tem liberdade para escolher a estilização que preferir para esse desafio.


