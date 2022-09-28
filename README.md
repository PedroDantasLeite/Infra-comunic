<h1 align="center">Aplicação cliente-servidor|Aplication client-server</h1>
:question: Este projeto foi criado para iniciar novos artigos TypeScript. | This project was created to begin new TypeScript articles.

# Língua|Language:
- [Português](#português)
- [English](#english)

# Português
*Sumário:*
- [Sobre o trabalho](#sobre-o-trabalho)
- [Como clonar o repositório](#como-clonar-o-repositório)
- [Como rodar o programa](#como-rodar-o-programa)
- [Como utilizar o programa](#como-utilizar-o-programa)
- [Dependências do trabalho](#dependências-do-trabalho)

## Sobre o trabalho:
*Desenvolve uma aplicação cliente-servidor capaz de, na camada de aplicação, fornecer uma comunicação confiável para os dados trocados entre os sistemas finais considerando um canal com perdas de dados e erros.*

## Como clonar o repositório:
```bash
$ git clone "https://github.com/PedroDantasLeite/Infra-comunic.git"
```
## Como rodar o programa:
*Lembre de baixar todas as dependências citadas mais abaixo antes de rodar, se não, vai resultar em erro.*
```bash
$ cd Infra-comunic
$ npm run compile
$ npm run start
```

## Como utilizar o programa:
##### Para mandar uma mensagem normal, sem nenhuma flag ativada:
- *A mensagem inteira é mandada em um único pacote, mesmo se ela estiver divida em substring.*
- Essa mensagem é recebida com sucesso.
##### Para mandar uma mensagem com erro, é necessário a flag chamda "Error" esteja ativada:
- *A mensagem inteira é mandada em um único pacote, mesmo se ela estiver divida em substring.*
- Essa mensagem tem erro.
##### Para mandar uma mensagem com perda, é necessário a flag chamda "Lost" esteja ativada:
- *A mensagem inteira é mandada em um único pacote, mesmo se ela estiver divida em substring.*
- Essa mensagem não foi recebedida, pois não chegou ao prazo estipulado pelo servidor. Então o servidor reenvia esse pacote.
##### Para mandar uma mensagem com diferentes pacotes, é necessário a flag chamda "Partial send" esteja ativada:
- *A mensagem inteira é mandada em vários pacotes, a quantidade de pacote depende da quantidade de substring.*
- Essa mensagem é recebida com sucesso para cada pacote apresentado.
##### Para mandar uma mensagem com erro em diferentes pacotes, é necessário a flag chamda "Partial send" esteja ativada e colocar no final da substring (pacote) escolhida(o) "-e":
- *A mensagem inteira é mandada em vários pacotes, a quantidade de pacote depende da quantidade de substring.*
- Essa mensagem é recebida com sucesso para cada pacote apresentado, menos para a substring escolhida, esse terá a mensagem com erro.
- *Caso também queira que tenha perda em um pacote específico, realizar o próximo passo.*
##### Para mandar uma mensagem com perda em diferentes pacotes, é necessário a flag chamda "Partial send" esteja ativada e colocar no final da substring (pacote) escolhida(o) "-l":
- *A mensagem inteira é mandada em vários pacotes, a quantidade de pacote depende da quantidade de substring.*
- Essa mensagem é recebida com sucesso para cada pacote apresentado, menos para a substring escolhida, esse terá a mensagem não recebedida, pois não chegou ao prazo estipulado pelo servidor. Então o servidor reenvia esse pacote.
- *Caso também queira que tenha erro em um pacote específico, realizar o passo anterior.*
##### Para mandar uma mensagem duplicada, é necessário a flag chamda "Duplicated" esteja ativada:
- *A mensagem inteira é mandada em um único pacote, mesmo se ela estiver divida em substring.*
- Essa mensagem é recebida com sucesso e reenviado novamente dizendo que o pacote foi duplicado.

> Obs: Para cada mensagem, uma nova requisição é realizada.

## Dependências do trabalho:
##### Utilizado:
> TypeScript; Node.js; Socket.io; Nodemon;
##### Comandos:
*Lembre de estar dentro do diretório.*
```bash
$ npm install
$ npm i -g nodemon
$ npm i -g tsc
```
