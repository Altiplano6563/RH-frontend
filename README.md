# Instruções para Instalação e Uso do Frontend Corrigido

Este documento contém instruções detalhadas para a instalação e uso do frontend corrigido do sistema de gestão de RH.

## Estrutura do Projeto

O frontend foi completamente revisado e padronizado, garantindo integração total com o backend. A estrutura de diretórios é a seguinte:

```
frontend_corrected/
├── public/                # Arquivos públicos
├── src/                   # Código-fonte
│   ├── components/        # Componentes reutilizáveis
│   ├── contexts/          # Contextos React (AuthContext, etc.)
│   ├── layouts/           # Layouts da aplicação
│   ├── pages/             # Páginas da aplicação
│   │   ├── auth/          # Páginas de autenticação
│   │   ├── dashboard/     # Dashboard
│   │   ├── departments/   # Gestão de departamentos
│   │   ├── employees/     # Gestão de funcionários
│   │   ├── movements/     # Gestão de movimentações
│   │   ├── positions/     # Gestão de cargos
│   │   └── profile/       # Perfil do usuário
│   ├── services/          # Serviços de API
│   ├── styles/            # Estilos globais
│   ├── utils/             # Utilitários
│   ├── App.js             # Componente principal
│   ├── FinalApp.js        # Aplicação final com rotas
│   └── index.js           # Ponto de entrada
└── package.json           # Dependências do projeto
```

## Requisitos

- Node.js (v14 ou superior)
- NPM ou Yarn
- Backend configurado e em execução

## Instalação

1. Extraia o arquivo `frontend_corrected.zip` para o diretório desejado.

2. Navegue até o diretório extraído:
   ```bash
   cd frontend_corrected
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```
   ou
   ```bash
   yarn install
   ```

4. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
     ```
     REACT_APP_API_URL=http://localhost:5000/api
     ```
   - Ajuste a URL conforme a localização do seu backend

## Execução

1. Para iniciar o servidor de desenvolvimento:
   ```bash
   npm start
   ```
   ou
   ```bash
   yarn start
   ```

2. Para criar uma build de produção:
   ```bash
   npm run build
   ```
   ou
   ```bash
   yarn build
   ```

O servidor de desenvolvimento será iniciado na porta 3000 por padrão e abrirá automaticamente no navegador.

## Integração com o Backend

O frontend foi projetado para integrar perfeitamente com o backend Node.js/Express. Para garantir a integração correta:

1. Certifique-se de que o backend esteja em execução antes de iniciar o frontend.

2. Verifique se a variável de ambiente `REACT_APP_API_URL` está apontando para a URL correta do backend.

3. O sistema de autenticação utiliza tokens JWT e refresh tokens para manter a sessão do usuário, conforme implementado no backend.

## Funcionalidades Principais

1. **Autenticação e Autorização**:
   - Login com email e senha
   - Registro de novos usuários
   - Recuperação de senha
   - Controle de acesso baseado em perfis

2. **Dashboard**:
   - Visão geral de estatísticas
   - Distribuição por departamento, cargo, modalidade de trabalho e carga horária
   - Histórico de movimentações
   - Análise salarial
   - Comparativo de orçamento

3. **Gestão de Funcionários**:
   - Listagem com filtros e paginação
   - Visualização detalhada
   - Cadastro e edição
   - Exclusão

4. **Gestão de Departamentos**:
   - Listagem
   - Cadastro e edição
   - Exclusão

5. **Gestão de Cargos**:
   - Listagem
   - Cadastro e edição
   - Exclusão

6. **Gestão de Movimentações**:
   - Listagem com filtros
   - Visualização detalhada
   - Cadastro e edição
   - Aprovação e rejeição

## Segurança e LGPD

O frontend foi revisado para garantir conformidade com a LGPD e boas práticas de segurança:

1. **Autenticação segura**: Implementação de JWT com refresh tokens para manter a sessão do usuário de forma segura.

2. **Controle de acesso**: Rotas protegidas e verificação de permissões baseada no perfil do usuário.

3. **Proteção de dados**: Dados sensíveis são exibidos apenas para usuários com permissões adequadas.

4. **Tratamento de erros**: Sistema robusto de tratamento de erros com feedback claro para o usuário.

5. **Validação de formulários**: Validação de entrada em todos os formulários para prevenir dados inválidos.

## Deploy em Produção

Para implantar o frontend em produção:

1. Crie uma build otimizada:
   ```bash
   npm run build
   ```
   ou
   ```bash
   yarn build
   ```

2. O diretório `build` gerado contém os arquivos estáticos que podem ser servidos por qualquer servidor web (Nginx, Apache, etc.) ou plataformas como Vercel, Netlify, ou Firebase Hosting.

3. Configure o servidor web para redirecionar todas as requisições para o `index.html`, permitindo que o React Router funcione corretamente.

4. Certifique-se de configurar HTTPS para proteger a comunicação entre cliente e servidor.

## Observações Importantes

1. **Variáveis de Ambiente**: Em produção, certifique-se de configurar a variável `REACT_APP_API_URL` para apontar para a URL correta do backend em produção.

2. **CORS**: O backend deve estar configurado para permitir requisições do domínio onde o frontend está hospedado.

3. **Responsividade**: A interface foi projetada para ser responsiva e funcionar bem em dispositivos móveis e desktop.

4. **Compatibilidade**: A aplicação é compatível com navegadores modernos (Chrome, Firefox, Safari, Edge).

## Suporte

Se encontrar algum problema ou tiver dúvidas sobre a implementação, entre em contato com a equipe de desenvolvimento.

---

Este frontend foi revisado e otimizado para garantir desempenho, segurança e integração perfeita com o backend.
