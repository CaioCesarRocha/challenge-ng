
# PROCESSO SELETIVO NG


### Descrição BACKEND
- Foi desenvolvido uma aplicação web fullstack, dockerizada, cujo objetivo seja possibilitar que usuários consigam realizar transferências internas entre si;


- Foi utilizado os conceitos do Clean Architecture separando ao máximo as regras de negócio da aplicação dentro do @Core 


- Autenticação dos Usuários utilizando JWT, testes unitários utilizando o Jest


### Tenolocias utilizadas 

<div style="display: inline_block">
  <img align="center" alt="Caio-Js" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-plain.svg">
  <img align="center" alt="Caio-Ts" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-plain.svg">
  <img align="center" alt="Caio-node" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"">
  <img align="center" alt="Caio-express" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg" />
  <img align="center" alt="Caio-postgres" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-plain-wordmark.svg" />
  <img align="center" alt="Caio-jest" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" />
  <img align="center" alt="Caio-docker" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain-wordmark.svg" />
  
</div><br>

### Descrição FRONTEND
- Foi desenvolvido uma plataforma web para que os usuários possam logar, fazer transferências e visualizar as transferências realizadas.

- Utilização do UseContext para lidar com o estados das transferências bem como do Usuário logado.

### Tenolocias utilizadas 

<div style="display: inline_block">
  <img align="center" alt="Caio-Js" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-plain.svg">
  <img align="center" alt="Caio-Ts" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-plain.svg">
  <img align="center" alt="Caio-HTML" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg">
  <img align="center" alt="Caio-React" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg">
  <img align="center" alt="Caio-React-Hooks" height="28" width="40" src="https://miro.medium.com/max/581/1*IUqLu4fox1-zw_kfxfgxOw.png">
  <img align="center" alt="Caio-Axios" height="28" width="80" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Axios_%28computer_library%29_logo.svg/1280px-Axios_%28computer_library%29_logo.svg.png">
  
  <img align="center" alt="Caio-docker" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain-wordmark.svg" />

</div><br>

### Outras tecnologias

- Prisma para manipular as tabelas/migrations do banco

- Insominia para testar as rotas da aplicação

- DBeaver para visualizar/manipular os dados gerado nas tabelas do banco

- Styled Components && RadixUI && PhosphorIcons para estilização do frontend e promover melhor interação para o usuário.

- React Load Spinner para tela de carregamento e React Toastify para exibir alerts personalizados.

- JS-Cookie para salvar os dados do usuário logado;

- React-Hook-Form && Zod para criação e validação de formulários


## Como rodar a aplicação

- Baixe a aplicação via git clone para seu ambiente de trabalho

- Necessário configurar as suas variáveis de ambiente no arquivo .env, conforme exemplificado no arquivo env.example na Api;

    - API_DATABASE_URL_ ->> URL de conexão do prisma com o banco de dados (POSTGRES)
    - API_MD5_HASH --> O hash utilizado para criptografar senhas(GERADO PELO MD5 HASH site)
    - DOCKER_DB_CONTAINER_NAME --> Nome do container qdo rodar o docker (tem q ser o mesmo que o utilizando na API_DATABASE_URL)
    - DOCKER_DB_USER --> Nome do user para conexão com o banco (tem q ser o mesmo que o utilizando na API_DATABASE_URL)
    - DOCKER_DB_PASSWORD -> Password para conexão com o banco(tem q ser o mesmo que o utilizando na API_DATABASE_URL)
    - DOCKER_DB_NAME --> Nome do banco de dados ao ser criado (tem q ser o mesmo que o utilizando na API_DATABASE_URL)

- Via docker - Basta rodar o comando docker-compose up  na pasta raiz do projeto

- Caso não tenha docker, é necessário entrar nas pasta Backend e  Frontend e rodar o comando npm install

    - Rodar a backend  -> npm run express

    - Rodar o frontend -> npm run start



