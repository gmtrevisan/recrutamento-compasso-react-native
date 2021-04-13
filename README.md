## Sobre

Esta aplicação foi desenvolvida para o teste do recrutamento da Compasso. É uma aplicação singlepage que consulta a API do The New York Times e apresenta para o usuário artigos das categorias Ciência e Tecnologia.

O projeto não usa nenhuma biblioteca de UI devido a baixa complexidade visual e de suas features. Foi criado com o Create React Native App, testado com RTL e faz uso do redux para controle de estado.

Para garantir uma melhor performance de carregamento, só são exibidas imagens de artigos em que a API retorna a o formato thumbnail (75x75), imagens maiores não serão exibidas.

## Comandos disponíveis

No diretório do projeto, você pode executar:

### `yarn`

Instala as dependências do projeto.

### `yarn web`

Executa a aplicação em modo de desenvolvimento.<br />

### `yarn android`

Executa a aplicação em modo de desenvolvimento e abre o aplicativo no emulador Android.

### `yarn test --coverage`

Executa os teste e apresenta cobertura.<br />