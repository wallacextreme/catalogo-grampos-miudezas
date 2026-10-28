# 📦 Catálogo de Balcão — Grampos, Presilhas e Miudezas Automotivas

> **Localizador Visual Instantâneo de Caixas Organizadoras, Códigos Internos e Peças Automotivas**  
> *PWA 100% Offline-First + Desktop Windows Nativo (Tauri v2)*

[![PWA Ready](https://img.shields.io/badge/PWA-Ready-10b981?style=for-the-badge&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Tauri v2](https://img.shields.io/badge/Tauri_v2-Desktop-ffc131?style=for-the-badge&logo=tauri&logoColor=black)](https://v2.tauri.app/)
[![Offline First](https://img.shields.io/badge/Offline--First-IndexedDB-f97316?style=for-the-badge)](https://developer.mozilla.org/pt-BR/docs/Web/API/IndexedDB_API)

---

## 🚀 Visão Geral

O **Catálogo de Balcão** foi projetado especificamente para o fluxo de alta velocidade do atendimento de autopeças e balcão de oficina. Ele resolve o gargalo de localizar rapidamente caixas de gaveteiros organizadores, códigos internos de loja (`MU...`, `LT...`), referências de fabricantes (`P-...`, `LF...`, `D...`) e montadoras (VW, GM, Fiat, Ford, Toyota, Honda, etc.).

### 🌟 Destaques do Sistema
- **⚡ Busca Omnibox Sub-50ms:** Motor em memória tolerante a acentuação, maiúsculas/minúsculas e variações como `"cx 940"`, `"caixa 10309"`, referências ou modelos de veículos.
- **📱 PWA Instalável (Progressive Web App):** Funciona no Google Chrome, Edge, Safari iOS e Android como um aplicativo nativo instalado na tela inicial ou na barra de tarefas.
- **🔌 100% Offline-First:** Persistência no **IndexedDB** local e **Service Worker v2** com cache de imagens WebP e dados estáticos. Opera perfeitamente mesmo sem conexão à internet.
- **🛡️ Isolamento Inviolável (Zero Sobrescrita):** Edições de caixas, códigos ou novas peças feitas no balcão nunca são sobrescritas ao sincronizar com sementes de catálogos (`isCustom: true`).
- **🖼️ Modo Mural Visual:** Alternância rápida entre lista técnica compacta e mural com fotos em alta definição para identificação com a peça física na mão do cliente.
- **🔒 Modo Privacidade de Preços:** Atalho no topo para ocultar ou exibir valores de venda instantaneamente.
- **🗺️ Mapa Interativo de Caixas:** Navegação visual por todas as caixas cadastradas no estoque com contagem de itens por gaveta.
- **💾 Backup & Disaster Recovery com SHA-256:** Exportação e restauração segura em arquivo JSON com checksum de integridade criptográfica.

---

## 🛠️ Tecnologias Utilizadas

- **Runtime & Gerenciador:** [Bun](https://bun.sh/)
- **Frontend Core:** TypeScript 5.5 (Modo Estrito), HTML5 Semântico, Tailwind CSS 3.4
- **Bundler & Dev Server:** Vite 5.3
- **Camada Offline:** Service Worker (Cache Storage) + IndexedDB API (`idb`)
- **Imagens:** WebP Ultra-Compacto Studio (~2KB a ~15KB por foto)
- **App Desktop Nativo:** Tauri v2 + Rust
- **Testes Automatizados:** Bun Test Suite (Testes de isolamento, busca, parsing e segurança)
- **Deploy Contínuo:** GitHub Actions & GitHub Pages

---

## 💻 Como Executar Localmente

### Pré-requisitos
- [Bun](https://bun.sh/) instalado (ou Node.js v18+)

### 1. Clonar o Repositório
```bash
git clone https://github.com/wallacextreme/catalogo-grampos-miudezas.git
cd catalogo-grampos-miudezas
```

### 2. Instalar Dependências
```bash
bun install
```

### 3. Rodar em Modo de Desenvolvimento
```bash
bun run dev
```
Abra no navegador em `http://localhost:5173`.

### 4. Executar Testes Automatizados
```bash
bun test
```

### 5. Compilar para Produção (PWA)
```bash
bun run build
```
Os arquivos otimizados e prontos para hospedagem estática serão gerados na pasta `dist/`.

---

## 🖥️ Execução Desktop com Tauri v2

Para executar ou gerar o instalador desktop para Windows (`.exe` / `.msi`):

```bash
# Modo desenvolvimento desktop
bun run tauri dev

# Compilar instalador Windows
bun run tauri build
```

---

## 📲 Como Instalar como PWA

1. Abra a aplicação no navegador (Chrome, Edge ou Safari no celular/PC).
2. Clique no botão verde **"Instalar App"** na barra superior (ou no ícone de instalação na barra de endereço do navegador).
3. O aplicativo será instalado como uma aplicação independente, com ícone próprio na área de trabalho e suporte a tela cheia.

---

## 📄 Licença

Desenvolvido para gestão de estoque e agilidade de atendimento no balcão de peças automotivas.
Todos os direitos reservados © Wallace Soares.
