# API BACK-END GRSTORES

**Descrição curta do projeto**: Uma breve descrição sobre o que o projeto faz e o problema que ele resolve.

---

## Sumário

- [Descrição do Projeto](#descrição-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Instalação](#instalação)
- [Uso](#uso)
- [Licença](#licença)

---

## Descrição do Projeto

Este projeto é um sistema de **API DO SISTEMA DA GRSTORE**, desenvolvido para **UM E_CORMECE**. Ele permite que os usuários **ACESSE UMA LOJA VIRTUAL**. O código foi implementado utilizando **NODE.JS, PRISMA, FASTIFY e TYPESCRIPT**.

---

## Funcionalidades

- **[Funcionalidade 1]**: Descrição breve da funcionalidade.
- **[Funcionalidade 2]**: Descrição breve da funcionalidade.
- **[Funcionalidade 3]**: Descrição breve da funcionalidade.
- **[Outras funcionalidades]**: Caso existam mais funcionalidades, adicione aqui.

---

## Instalação

Siga as etapas abaixo para configurar o ambiente e rodar o projeto localmente.

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/usuario/nome-do-repositorio.git
   cd nome-do-repositorio

2. **Baixando as dependencias**:
    
    Execute o comando abaixo para instalar todas as dependências necessárias para o projeto:

    npm install

    Gere os arquivos do Prisma (caso esteja usando Prisma para migrações, caso não, remova esta parte):

    npx prisma generate

3. **Variáveis de Ambiente (se necessário)**:

   ```bash
   .ENV DATABASE_URL=mongodb://<usuário>:<senha>@localhost:27017/nome-do-banco


## Uso

    npm run dev


    Endpoints principais

    A seguir estão alguns dos principais endpoints da API:

    POST /auth/register: Registro de um novo usuário.
    POST /auth/login: Login de um usuário existente.
    GET /products: Lista todos os produtos.
    GET /products/:id: Recupera os detalhes de um produto específico.
    POST /products: Cria um novo produto (requer permissão de administrador).
    PUT /products/:id: Atualiza um produto existente.
    DELETE /products/:id: Deleta um produto.
    POST /cart: Adiciona um produto ao carrinho.
    POST /checkout: Realiza o checkout do carrinho e cria um pedido.

    Ferramentas de Desenvolvimento
    Jest: Para testes unitários e de integração.
    Prettier: Para formatação de código.
    ESLint: Para linting de código.

## Licença

    Este projeto está licenciado sob a MIT License.