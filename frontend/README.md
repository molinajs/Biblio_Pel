# Bibliopel - Sistema de Gerenciamento de Biblioteca

Sistema completo de gerenciamento de biblioteca desenvolvido em HTML, CSS e JavaScript puro com autenticação.

## Características

- **Sistema de Login**: Autenticação segura com proteção de páginas
- **Dashboard**: Visão geral com estatísticas e atividades recentes
- **Gerenciamento de Livros**: Adicione, edite e remova livros do acervo
- **Controle de Empréstimos**: Registre e acompanhe empréstimos de livros
- **Gestão de Usuários**: Cadastre e gerencie usuários da biblioteca
- **Relatórios**: Gere relatórios e visualize estatísticas

## Design

- Cores azul e branco conforme solicitado
- Interface responsiva e moderna
- Ícones Font Awesome para melhor experiência visual
- Layout profissional e intuitivo

## Como Usar

1. Extraia todos os arquivos em uma pasta
2. Abra o arquivo `login.html` em seu navegador
3. Faça login com as credenciais padrão:
   - **Usuário**: admin
   - **Senha**: admin123
4. Navegue pelas diferentes seções usando o menu lateral

## Estrutura de Arquivos

- `login.html` - Página de login
- `index.html` - Dashboard principal
- `livros.html` - Gerenciamento de livros
- `emprestimos.html` - Controle de empréstimos
- `usuarios.html` - Gestão de usuários
- `relatorios.html` - Relatórios e estatísticas
- `styles.css` - Estilos do sistema
- `script.js` - Funcionalidades JavaScript
- `auth.js` - Sistema de autenticação

## Segurança

- Sistema de autenticação com localStorage
- Proteção automática de todas as páginas
- Logout funcional
- Redirecionamento automático para login quando não autenticado

## Próximos Passos

Para transformar este sistema em uma aplicação completa:
- Integrar com backend (Node.js, PHP, Python, etc.)
- Adicionar banco de dados (MySQL, PostgreSQL, MongoDB)
- Implementar autenticação JWT real
- Adicionar geração real de relatórios em PDF
- Hash de senhas com bcrypt

## Tecnologias

- HTML5
- CSS3
- JavaScript ES6
- Font Awesome 6.4.0
- LocalStorage API
