# NesterFront

Este projeto é um frontend Angular chamado "NesterFront". Ele fornece uma interface de usuário para uma aplicação de rede social, permitindo que os usuários se cadastrem, façam login, gerenciem seus perfis, visualizem e interajam com postagens.

### Funcionalidades Principais

* **Autenticação de Usuário**:
    * **Login**: Os usuários podem entrar na aplicação com seu e-mail e senha.
    * **Cadastro**: Novos usuários podem se registrar fornecendo nome completo, e-mail, data de nascimento e senha.
    * **Recuperação de Senha**: Funcionalidade para redefinir a senha através de um link enviado por e-mail.
    * **Guards de Rota**: Proteção de rotas para garantir que apenas usuários autenticados acessem certas partes da aplicação (`AuthGuard`) e que usuários já logados sejam redirecionados de páginas de login/cadastro (`GuestGuard`).
    * **Interceptor de Autenticação**: Adiciona automaticamente o token de autorização às requisições HTTP.
    * **Interceptor de Erro**: Lida com erros HTTP, como `401` ou `403`, redirecionando para a página de login.

* **Funcionalidades de Perfil**:
    * **Meu Perfil**: Exibe o perfil do usuário logado, suas postagens, quantidade de seguidores e quem ele está seguindo. Permite editar informações do perfil e a foto.
    * **Perfil de Outros Usuários**: Permite visualizar o perfil de outros usuários, suas postagens e a opção de segui-los.
    * **Busca de Usuários**: Capacidade de buscar outros usuários e visualizar perfis recomendados.

* **Funcionalidades de Postagem**:
    * **Feed**: Exibe postagens para o usuário, separadas entre "Para Você" (geral) e "Seguindo" (de usuários seguidos).
    * **Criação de Postagem**: Permite aos usuários criar novas postagens.
    * **Edição de Postagem**: Usuários podem editar suas próprias postagens.
    * **Exclusão de Postagem**: Usuários podem deletar suas próprias postagens.
    * **Curtir/Descurtir Postagem**: Permite interagir com as postagens curtindo-as ou removendo curtidas.

### Estrutura do Projeto

O projeto é construído com Angular e segue uma estrutura modular, com componentes para cada seção da UI (`components`), interfaces para tipagem de dados (`interfaces`) e serviços para comunicação com a API de backend (`services`).

### Como Rodar o Projeto (Ambiente de Desenvolvimento)

1.  **Instale as dependências**:
    ```bash
    npm install
    ```
    ou
    ```bash
    yarn install
    ```
2.  **Inicie o servidor de desenvolvimento**:
    ```bash
    ng serve
    ```
    Navegue até `http://localhost:4200/` no seu navegador. A aplicação será recarregada automaticamente se você fizer alterações nos arquivos de origem.
