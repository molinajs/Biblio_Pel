# 📚 Bibliopel

Sistema de gerenciamento de biblioteca desenvolvido para fins acadêmicos e de aprendizado. Construído com HTML5, CSS3, JavaScript puro (ES6+) e LocalStorage. 

## Autores: João Molina, Gilberto Xavier, Guilherme Barreto

Acesse o projeto em produção aqui: [Bibliopel](#)

---

## Visão Geral

O **Bibliopel** é uma aplicação web completa para controle e administração de acervos bibliográficos. Ele permite o gerenciamento de livros, usuários, registro de empréstimos, acompanhamento de devoluções e visualização de relatórios gerenciais através de um dashboard intuitivo.

Este repositório serve como base acadêmica e demonstra conceitos como:

- Estruturação semântica com HTML5;
- Estilização responsiva e moderna com CSS3 puro;
- Manipulação dinâmica do DOM com JavaScript (ES6+);
- Autenticação de usuários e navegação protegida;
- Persistência de dados locais com LocalStorage API;
- Organização modular de scripts e folhas de estilo.

---

## 📸 Demonstração do Sistema

### 🔐 Tela de Login
![Tela de Login](assets/login.jpg)

### 📚 Gerenciamento de Livros
![Gerenciamento de Livros](assets/gernciadordelivros.jpg)

### 🔄 Controle de Empréstimos
![Controle de Empréstimos](assets/emprestado.jpg)

### 👥 Gestão de Usuários
![Gestão de Usuários](assets/gerenciadordeusu.jpg)

### 📈 Relatórios
![Relatórios](assets/relatorios.jpg)

---

## Tecnologias

- **HTML5** – Estruturação semântica de páginas web;
- **CSS3** – Estilização moderna, responsiva e com paleta personalizada;
- **JavaScript (ES6+)** – Adição de interatividade, manipulação do DOM e lógica da aplicação;
- **LocalStorage API** – Armazenamento e persistência de dados no próprio navegador;
- **Font Awesome 6.4.0** – Biblioteca para inclusão de ícones e melhoria da experiência do usuário.

---

## Funcionalidades

- **🔐 Autenticação:** Sistema de login com proteção de páginas, controle de acesso e logout seguro;
- **📊 Dashboard:** Visão geral do sistema com estatísticas e atividades recentes em tempo real;
- **📚 Gerenciamento de Livros:** Cadastro, edição, remoção e consulta rápida do acervo;
- **🔄 Controle de Empréstimos:** Registro de saídas, acompanhamento de prazos e confirmação de devoluções;
- **👥 Gestão de Usuários:** Cadastro de leitores e controle simples de permissões;
- **📈 Relatórios:** Visualização gráfica de estatísticas e métricas do acervo;
- **🎨 Interface Responsiva:** Layout moderno em tons de azul e branco, otimizado para diferentes dispositivos.

---

## Estrutura do Projeto

```text
Bibliopel/
├── login.html        # Página de login e autenticação
├── index.html        # Dashboard principal do sistema
├── livros.html       # Módulo de cadastro e consulta de livros
├── emprestimos.html  # Controle de empréstimos e devoluções
├── usuarios.html     # Gestão de leitores e permissões
├── relatorios.html   # Métricas e relatórios gerenciais
├── styles.css        # Estilos globais da aplicação
├── script.js         # Lógica dinâmica e manipulação de tela
└── auth.js           # Controle de sessão e segurança de rotas
