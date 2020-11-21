PostgresSQL
O banco de dados que iremos usar é o PostgresSQL.

É um banco de dados relacional, com código aberto e um dos mais avançados.

NodeJS

Para usar postgres no seu projeto NodeJS adicione a dependencia ao seu projeto

npm install pg

Instalando no Mac:

brew install postgres

[] - Iniciar o postgres
    pg_ctl -D /usr/local/var/postgres start

[] - Desligar o postgres
    pg_ctl -D /usr/local/var/postgres stop

- Instalando no Windows

Para instalar o postgres no windows, você pode baixar o instalador no site abaixo, ou seguir o passo-a-passo para instalar com o chocolatey

Baixar do site oficial

https://www.enterprisedb.com/downloads/postgres-postgresql-downloads

Chocolatey

cinst postgresql12 --params '/Password:postgres' -y

Esse processo vai demorar um bocado. Nos meus testes, cerca de 20 minutos, mas depende da sua máquina e da sua conexão com a internet.

Quando chegar numa tela parecida com essa, provavelmente estará na metade do caminho.

Metade Da Instalação

Caso fique tudo travado por mais de 20 minutos ou dê erros, procure entrar na pasta C:\Program Files\PostgreSQL\12, caso seu Windows seja 32 bits ou C:\Program Files (x86)\PostgreSQL\12, caso seu Windows seja 64 bits.

Perceba que a versão que estou usando para criar esse tutorial, é a versão 12. Caso a sua versão instalada seja outra, atente-se ao número da versão na pasta acima. Troque o 12 pela versão do seu postgres.

Image

Caso haja os arquivos, então sua instação deu certo. Se não deu certo, você pode tentar novamente o processo, ou, baixar direto do site do fabricante e instalar o pacote.

Ligar o Postgres

Abra o Powershell como administrador, e navegue até a pasta da instação
cd "C:\Program Files\PostgreSQL\12\bin\"

Inicie o postgres com o comando abaixo:
.\pg_ctl.exe -D "C:\Program Files\PostgreSQL\12\data" start

Note que o -D tem que ser maiúsculo para que o comando seja executado perfeitamente.

Desligar o Postgres

Use o passo número 1 acima e digite o comando para desligar

.\pg_ctl.exe -D "C:\Program Files\PostgreSQL\12\data" stop

Instalando no Linux:

Documentação Oficial de Instalação do Postgres

Postbird

É um aplicativo multi plataforma que vai te permitir usar o PostgresSQL com uma interface gráfica, para fazer as operações no banco de dados.

Para instalar, vá até o site: https://electronjs.org/apps/postbird e baixe o app.