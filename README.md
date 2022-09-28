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

# English
*Summary:*
- [About the project](#about-the-project)
- [How to clone the repository](#how-to-clone-the-repository)
- [How to run the program](#how-to-run-the-program)
- [How to use the program](#how-to-use-the-program)
- [Project dependencies](#project-dependencies)

## About the project:
*Develops a client-server application capable of, at the application layer, providing secure communication for data systems exchanged between the ends considering a channel with data losses and errors.*

## How to clone the repository:
```bash
$ git clone "https://github.com/PedroDantasLeite/Infra-comunic.git"
```

## How to run the program:
*Remember to download all dependencies mentioned below before running, otherwise it will result in an error.*
```bash
$ cd Infra-comunic
$ npm run compile
$ npm run start
```

## How to use the program:
##### To send a normal message, with no flag activated:
- *The entire message is sent in a single packet, even if it is split into a substring.*
- This message received is successful.
##### To send a message with an error, it is necessary to have the message called "Error" activated flag:
- *The entire message is sent in a single packet, even if it is split into a substring.*
- This message has an error.
##### To send a message with loss, the message flag "Lost" must be activated:
- *The entire message is sent in a single packet, even if it is split into a substring.*
- This message was not received, as it did not reach the deadline stipulated by the server. Then the server resends that packet.
##### For a message with different packages, the flag called "Partial send" is required for an activated message:
- *The entire message is sent in several packets, the amount of packet depends on the amount of substring.*
- This message received is successful for each package presented
##### To send a message with error in different, it is necessary a flag called "Partial send" activated and put at the end of the substring (package) chosen (the) "-e":
- *The entire message is sent in several packets, the amount of packet depends on the amount of substring.*
- This received message is received successfully for each packet minus the chosen substring, this one will have the error message.
- *If you also want to have a specific package, perform the next step.*
##### To send a lossy message in different, it is necessary to have a flag called "Partial send" activated and put "-l" at the end of the substring (package) chosen:
- *The entire message is sent in several packets, the amount of packet depends on the amount of substring.*
- This received message is successfully received for each chosen packet, this one has the message not received, because it did not reach the stipulated by the server. Then the server resends that packet.
- *If you also want an error in a specific package, perform the previous step.*
##### To send a duplicate message, the flag called" must be activated:
- *The entire message is sent in a single packet, even if it is split into a substring.*
- This message is successfully received again and resends saying that the packet has been duplicated.

## Project dependencies:
##### Used:
> TypeScript; Node.js; Socket.io; Nodemon;
##### Commands:
*Remember to be inside the directory.*
```bash
$ npm install
$ npm i -g nodemon
$ npm i -g tsc
```
