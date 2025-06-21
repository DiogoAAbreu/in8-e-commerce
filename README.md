# Teste Técnico Devnology - Solução de E-commerce Fullstack

Este repositório contém a solução desenvolvida para o teste técnico de desenvolvedor(a) fullstack da Devnology. O projeto consiste numa plataforma de e-commerce completa, que integra produtos de duas APIs externas distintas, permitindo ao utilizador pesquisar, filtrar, adicionar itens a um carrinho e finalizar a compra com persistência de dados.

## 1. Como Rodar o Projeto

Este projeto utiliza uma estrutura de monorepo, contendo as pastas `backend` e `frontend`. Siga os passos abaixo para executar cada parte da aplicação.

### Pré-requisitos
* [Node.js](https://nodejs.org/) (versão 18 ou superior)
* [NPM](https://www.npmjs.com/) (geralmente instalado com o Node.js)

### 1.1. Backend (Servidor Express.js)

1.  **Navegue até à pasta do backend:**
    ```bash
    cd backend
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    * Renomeie o ficheiro `.env.example` para `.env`.
    * Abra o ficheiro `.env` e preencha as variáveis da seguinte forma:

    ```env
    # URL base da API do fornecedor brasileiro (sem / no final)
    BRAZILIAN_PROVIDER_URL=
    
    # URL base da API do fornecedor europeu (sem / no final)
    EUROPEAN_PROVIDER_URL=

    # Caminho para o banco de dados SQLite local
    DATABASE_URL="file:./dev.db"
    ```

4.  **Crie e aplique as migrações do banco de dados:**
    * O Prisma irá criar um ficheiro de banco de dados SQLite e configurar as tabelas necessárias.
    ```bash
    npx prisma migrate dev
    ```

5.  **Inicie o servidor do backend:**
    * O servidor irá rodar em modo de desenvolvimento na porta `5000` (ou a que estiver definida no seu `.env`).
    ```bash
    npm start
    ```

### 1.2. Frontend (Aplicação React com Vite)

1.  **Abra um novo terminal** e navegue até à pasta do frontend:
    ```bash
    cd frontend
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Configure as variáveis de ambiente:**
    * Na pasta `frontend`, crie um ficheiro chamado `.env`.
    * Adicione a seguinte linha a ele:

    ```env
    # URL base da sua API de backend local
    VITE_API_URL=http://localhost:5000
    ```

4.  **Inicie a aplicação do frontend:**
    * O servidor de desenvolvimento do Vite irá iniciar, geralmente na porta `5173`.
    ```bash
    npm run dev
    ```
5.  Abra o seu navegador e aceda ao endereço fornecido pelo Vite para ver a aplicação a funcionar.

---

## 2. Decisões Técnicas Tomadas

Esta secção detalha algumas das principais decisões de arquitetura e tecnologia feitas durante o desenvolvimento.

### 2.1. Estrutura do Projeto

* **Monorepo:** Optei por uma estrutura de monorepo para manter o código do frontend e do backend num único repositório. Isto simplifica a gestão do projeto, a configuração do versionamento e facilita a vida do avaliador, que precisa de clonar apenas um repositório para ter acesso a todo o código.

### 2.2. Backend

* **Express.js em vez de NestJS:** Embora a recomendação fosse NestJS, optei por usar Express.js para demonstrar um conhecimento fundamental e sólido do ecossistema Node.js. A estrutura foi organizada com uma clara separação de responsabilidades (rotas, controllers, serviços, middlewares), mostrando a capacidade de construir uma API robusta e organizada sem a abstração de um framework mais opinativo.
* **Persistência com Prisma e SQLite:** Para cumprir o requisito de persistência de pedidos, escolhi o Prisma como ORM pela sua segurança de tipos e facilidade de uso com migrações. O SQLite foi usado como banco de dados por ser extremamente simples de configurar para um ambiente de desenvolvimento (não requer um servidor separado), cumprindo o requisito de persistência de forma eficaz.
* **Backend como Camada de Unificação:** Toda a lógica de integração com as APIs externas foi centralizada no backend. É ele o responsável por:
    * Buscar os dados das duas fontes.
    * **Padronizar os dados** que vêm em formatos diferentes num modelo único para o frontend.
    * Resolver **conflitos de IDs** duplicados, criando IDs únicos prefixados (`br_`, `eu_`).
    * Lidar com **URLs de imagens quebradas**, substituindo-as por placeholders funcionais.
* **Paginação e Filtros no Backend:** Para garantir a performance e a escalabilidade, toda a lógica de paginação, filtragem e busca é feita no servidor. O frontend apenas solicita os dados de que precisa, tornando a aplicação mais rápida e eficiente.

### 2.3. Frontend

* **Vite para o Ambiente de Desenvolvimento:** Em vez do `create-react-app`, que já não é mais recomendado, optei por usar o Vite para criar o projeto React. O Vite oferece um servidor de desenvolvimento e um processo de build muito mais rápidos e modernos.
* **Tailwind CSS para Estilização:** Para a estilização da interface, escolhi o Tailwind CSS. A sua abordagem **utility-first**, combinada com um fluxo de trabalho **mobile-first**, permite construir layouts complexos e responsivos diretamente no HTML/JSX. Isto significa que construímos primeiro para ecrãs pequenos e depois adaptamos para ecrãs maiores de forma intuitiva, o que acelera o desenvolvimento e garante uma experiência de qualidade em todos os dispositivos.
* **React Context API para Gestão de Estado Global:** Para gerir o estado do carrinho de compras, que precisa de ser acedido por múltiplos componentes (cards de produto, cabeçalho, página de checkout), usei a Context API do React. Isto evita o "prop drilling" e cria uma arquitetura limpa e escalável, onde um hook personalizado (`useCart`) centraliza toda a lógica de manipulação do carrinho.
* **Persistência do Carrinho com `localStorage`:** Para melhorar a experiência do utilizador, o estado do carrinho de compras é guardado no `localStorage` do navegador. Isto garante que, se o utilizador recarregar a página, os itens que ele adicionou ao carrinho não sejam perdidos, criando uma experiência de compra mais fluida e contínua.
* **Estrutura de Componentes e Hooks:** A aplicação foi estruturada com uma clara separação entre **páginas**, **componentes reutilizáveis** e **hooks personalizados**. Hooks como `useProducts` e `useOrderDetail` foram criados para isolar a lógica de busca e gestão de estado dos dados, deixando os componentes de página focados apenas na sua responsabilidade de apresentação.
