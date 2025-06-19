# 🖥️ Chill Desktop

[![Angular](https://img.shields.io/badge/Angular-19-red?logo=angular)](https://angular.io)
[![NX](https://img.shields.io/badge/NX-21-blue?logo=nx)](https://nx.dev)
[![Material Design](https://img.shields.io/badge/Material_Design-v3-orange?logo=material-design)](https://material.angular.io)
[![NgRX](https://img.shields.io/badge/NgRX-19-purple?logo=ngrx)](https://ngrx.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org)

## 🌟 Sobre o Projeto

Chill Desktop é uma aplicação web moderna que **simula a experiência de um desktop de computador** com aplicativos voltados para produtividade. Desenvolvida com as tecnologias do ecossistema Angular, oferece uma interface com um UI/UX aprimorado e funcional com informações úteis do dia a dia. **Também conta com acessibilidade.**

### 👽 Funcionalidades

- **📱 Menu de Aplicativos** - Interface desktop-like com menu inferior
- **🌤️ Informações Meteorológicas** - Clima atual com detalhes completos
- **💱 Cotações de Moedas** - Câmbio atualizado de diversas moedas
- **🍅 Pomodoro Timer** - Técnica de produtividade com temporizador
- **✅ Todo List** - Gerenciamento de tarefas pessoais
- **🎵 Music Player** - Reprodutor de música integrado
- **📝 Notes** - Aplicativo de anotações rápidas
- **📋 Kanban Board** - Quadro de gerenciamento de projetos
- **⚙️ Configurações** - Gerenciamento de configurações da aplicação (temas por exemplo)

## 🛠️ Stack Tecnológica

### Frontend Framework

- **Angular 19** - Framework principal com standalone components
- **TypeScript 5.7** - Linguagem de programação tipada

### Arquitetura e Ferramentas

- **NX Workspace** - Monorepo com ferramentas avançadas de desenvolvimento
- **NgRX 19** - Gerenciamento de estado reativo
- **RxJS 7.8** - Programação reativa com observables

### UI/UX

- **Angular Material 19** - Componentes Material Design v3
- **SCSS** - Pré-processador CSS para estilização avançada
- **Tailwind CSS** - Framework CSS utilitário

### Testes e Qualidade

- **Jest** - Framework de testes unitários
- **Playwright** - Testes end-to-end
- **ESLint** - Linter para qualidade de código
- **Prettier** - Formatação automática de código

## 🏗️ Arquitetura do Projeto

O projeto segue uma arquitetura modular e escalável baseada em NX:

```
chill-desktop/
├── apps/
│   ├── chill-desktop/           # Aplicação principal
│   └── chill-desktop-e2e/       # Testes E2E
├── libs/
│   ├── data-access/             # Camada de dados store GLOBAL (NgRX)
│   │   ├── actions/             # Actions do NgRX
│   │   ├── effects/             # Effects do NgRX
│   │   ├── reducers/            # Reducers do NgRX
│   │   └── selectors/           # Selectors do NgRX
│   ├── services/                # Serviços da aplicação
│   ├── shared/
│   │   ├── models/              # Interfaces, tipos e de/paras
│   │   ├── app-environment/     # Configurações de ambiente
│   │   └── ui/                  # Componentes compartilhados
│   └── shell/
│       └── ui/                  # Componentes de layout
│           ├── layout/          # Layout principal
│           ├── navbar/          # Barra de navegação
│           ├── menu-bar/        # Menu inferior
│           └── main-content/    # Conteúdo principal
```

### 🎯 Princípios Arquiteturais

- **Separation of Concerns** - Cada biblioteca tem responsabilidade bem definida
- **Standalone Components** - Componentes independentes do Angular 19
- **Reactive Programming** - Uso extensivo de RxJS e NgRX
- **Type Safety** - TypeScript rigoroso em todo o projeto
- **Clean Code** - Código limpo e bem documentado

## 🚀 Começando

### Pré-requisitos

```bash
Node.js >= 18.16.9
npm >= 9.0.0
```

### Instalação

1. **Clone o repositório**

```bash
git clone <repository-url>
cd chill-desktop
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

```bash
# Copie o arquivo de exemplo
cp apps/chill-desktop/src/environments/environment.example.ts apps/chill-desktop/src/environments/environment.ts

# Configure suas chaves de API (OpenWeather, etc.)
```

4. **Execute a aplicação**

```bash
npm run dev
# ou
npx nx serve chill-desktop
```

A aplicação estará disponível em `http://localhost:4200`

## 📋 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev                    # Inicia o servidor de desenvolvimento
npm run build                 # Build de produção
npm run build:dev             # Build de desenvolvimento

# Testes
npm run test                   # Executa todos os testes
npm run test:watch            # Testes em modo watch
npm run test:file:watch       # Testa arquivo específico em watch

# Qualidade de Código
npm run lint                   # Executa o linter
npm run format                # Formata o código
npm run format:check          # Verifica a formatação
```

## 🧪 Testes

### Testes Unitários

```bash
# Executa todos os testes
npm run test

# Testa um projeto específico
npx nx test <project-name>

# Testes em modo watch
npm run test:watch --project-PROJECT-NAME
```

### Testes E2E (Ainda não implementados)

## 🌐 Recursos Externos

### APIs Utilizadas

- **OpenWeather API** - Dados meteorológicos em tempo real
- **Exchange Rates API** - Cotações de moedas atualizadas

### Configuração de APIs

Configure suas chaves de API no arquivo `environment.ts`:

```typescript
export const environment = {
  production: false,
  openWeatherApiKey: 'sua-chave-openweather',
  exchangeRatesApiKey: 'sua-chave-exchange-rates',
};
```

---

**Tamo junto para você que leu até aqui! 🫵❤️**
