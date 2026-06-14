# Java Slot Machine - Versão Full-Stack Web

---

## 🔎 Visão Geral do Projeto / Project Overview

    Este projeto representa a evolução avançada da aplicação original de linha de comando em Java para um 
    simulador de cassino web completo (Full-Stack). A aplicação foi totalmente desenvolvida pelo agente de 
    Inteligência Artificial Antigravity sob a minha orientação e engenharia de prompts. O sistema combina um 
    backend em Spring Boot com uma interface web responsiva construída em React, TypeScript e CSS Vanilla, 
    contando com efeitos sonoros sintetizados via Web Audio API.

    EN: This project represents the advanced evolution of the original command-line Java application into a 
    complete web-based casino simulator (Full-Stack). The application was fully developed by the Antigravity 
    AI agent under my guidance and prompt engineering. It combines a Spring Boot backend with a responsive 
    web interface built in React, TypeScript, and Vanilla CSS, featuring sound effects synthesized via the Web Audio API.

**Objetivo (Objective):** Testar e aprimorar minhas habilidades de **Prompt Engineering (Engenharia de Prompts)**, 
guiando um agente de IA de forma lógica e iterativa para transformar com sucesso um projeto legado de console em Java 
em uma aplicação web moderna de alto nível, compreendendo as arquiteturas sugeridas e resolvendo bugs em tempo real.

---

## 🗂️ Estrutura do Projeto / Project Structure

A aplicação foi organizada em um modelo multi-módulo contendo o backend Java e o frontend Node/React, gerenciados de forma independente.

```text
Cassino-Web/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/cassino/
│   │   │   │   ├── config/
│   │   │   │   │   └── CorsConfig.java
│   │   │   │   ├── controller/
│   │   │   │   │   └── GameController.java
│   │   │   │   ├── service/
│   │   │   │   │   └── GameService.java
│   │   │   │   └── CassinoApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   │       └── java/com/cassino/service/
│   │           └── GameServiceTest.java
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── SlotSymbol.tsx
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── tsconfig.json
└── README.md
```

---

## 🧰 Tecnologias e Ferramentas / Technologies & Tools

| Linguagem | Framework (Backend) | Framework (Frontend) | Controle de Versão | Ferramentas de Apoio |
| :---: | :---: | :---: | :---: | :---: |
| ![Java](https://img.shields.io/badge/Java%2021-ED8B00?style=flat-square&logo=openjdk&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white) | ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=flat-square&logo=springboot&logoColor=white) | ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) | ![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white) | ![Apache Maven](https://img.shields.io/badge/Apache%20Maven-C71A36?style=flat-square&logo=apachemaven&logoColor=white) ![Antigravity (AI)](https://img.shields.io/badge/Antigravity%20(AI)-7F3FBF?style=flat-square&logo=googlegemini&logoColor=white) |

---

## 🧠 Lições de Arquitetura e Crescimento (What I learned)

Este projeto foi uma experiência de aprendizado focada na colaboração homem-máquina e no refinamento de instruções para desenvolvimento de software.

### 1. Engenharia de Prompts e Liderança de Projeto com IA
Aprendi a projetar prompts melhores, mais claros e detalhados. A clareza ao especificar regras de negócio, layouts e restrições tecnológicas permitiu que o agente de IA (**Antigravity**) gerasse código limpo, coerente e com o mínimo de falhas de comunicação.

### 2. Análise de Arquitetura e Estruturação de Código
Atuei na análise e validação da arquitetura multi-módulo (Backend Spring Boot e Frontend React + TS) proposta pela IA, garantindo a fidelidade às regras originais do cassino e validando os padrões recomendados de design de API.

### 3. Resolução de Erros e Depuração em Tempo Real
Identifiquei erros de compilação, tipagem no TypeScript e falhas de CORS/sessão em ambiente de desenvolvimento, fornecendo logs e trechos de código exatos para que a IA investigasse e propusesse as correções ideais.

### 4. Direcionamento para Síntese Sonora Criativa
Instruí e guiei a IA a implementar uma solução de áudio leve utilizando a **Web Audio API** do navegador para criar sons dinâmicos (Girar, Parar e Jackpot) em tempo real, eliminando a dependência de carregar arquivos externos pesados de mídia.

--- 

## 💻 Contatos / Contacts

| Network Profile | E-mail | Social Profile |
|------------------|------------------|------------------|
| [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/paulo-m-sandes-51742422b) | [![Gmail](https://img.shields.io/badge/Gmail-EFEFEF?style=flat&logo=gmail&logoColor=555555)](mailto:paulohenriquesandes@gmail.com) | [![Instagram](https://img.shields.io/badge/Instagram-E1306C?style=flat&logo=instagram&logoColor=white)](https://www.instagram.com/sandes_xz) |

---

## 🚀 Teste o Projeto Localmente / Test the Project Locally

```text
1. Clone o repositório:
   git clone https://github.com/seu-usuario/Cassino-Web.git

2. Entre na pasta do projeto:
   cd Cassino-Web

3. Inicie o Servidor Backend (Java 21):
   cd backend
   # No Windows:
   .\mvnw.cmd spring-boot:run
   # No Linux/macOS:
   ./mvnw spring-boot:run

4. Inicie o Servidor Frontend (Node.js):
   cd ../frontend
   npm install
   # No Windows (com scripts desabilitados):
   npm.cmd run dev
   # No Linux/macOS ou CMD padrão:
   npm run dev

5. Acesse no navegador:
   Abra http://localhost:5173 para jogar!
```

---

## 🌐 Como Fazer o Deploy em Produção / Production Deployment

Esta seção explica como colocar a aplicação no ar na web para que qualquer pessoa possa acessar e jogar.

### 1. Deploy do Backend no **Render** (Java 21)
O backend em Spring Boot será hospedado no **Render**:
1. Acesse o site do [Render](https://render.com/) e crie uma conta usando o seu login do GitHub.
2. No painel do Render, clique no botão **"New +"** (canto superior direito) e escolha **"Web Service"**.
3. Selecione o repositório `Cassino-Web` da lista de repositórios do seu GitHub.
4. Preencha os campos com as seguintes configurações:
   - **Name**: `cassino-backend` (ou o nome que preferir)
   - **Root Directory**: `backend` (indica que o Maven está nessa pasta)
   - **Language**: `Java`
   - **Build Command**: `./mvnw clean package -DskipTests`
   - **Start Command**: `java -jar target/slot-machine-backend-0.0.1-SNAPSHOT.jar`
5. Clique em **"Deploy Web Service"** no rodapé e aguarde a compilação finalizar.
6. Uma URL pública e segura será gerada no topo da página (ex: `https://cassino-backend.onrender.com`). **Copie essa URL.**

### 2. Deploy do Frontend no **Vercel** (React/TypeScript)
O frontend em Vite será hospedado na **Vercel**:
1. Acesse a [Vercel](https://vercel.com/) e faça login usando a sua conta do GitHub.
2. Clique em **"Add New..."** > **"Project"** e importe o repositório `Cassino-Web`.
3. Antes de iniciar o deploy, configure as seguintes opções:
   - **Root Directory**: Clique em **"Edit"** e selecione a pasta `frontend`.
   - **Framework Preset**: Garanta que esteja selecionado como **Vite** (geralmente detectado automaticamente).
   - **Environment Variables**: Expanda a aba e adicione a seguinte variável:
     - **Name**: `VITE_API_URL`
     - **Value**: `https://seu-link-do-render.onrender.com/api/game` (substitua pelo link que você copiou do Render, mantendo o final `/api/game`).
4. Clique em **"Deploy"** e aguarde a conclusão.
5. Acesse o link final gerado pela Vercel e jogue diretamente pela web!