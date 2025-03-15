# Estudo de Automação de Testes

Este projeto faz parte do curso "Cypress do Zero a Nuvem" oferecido por Walmyr na escola Talking About Testing. O objetivo é aprender e aplicar conceitos de automação de testes utilizando o Cypress.

## Tecnologias Utilizadas

- **Cypress**: Framework de testes end-to-end para aplicações web.
- **JavaScript**: Linguagem de programação utilizada para escrever os testes.
- **Node.js**: Ambiente de execução para JavaScript.
- **NPM**: Gerenciador de pacotes para dependências do projeto.

## Estrutura do Projeto

- `cypress/`: Contém os testes automatizados e configurações do Cypress.
    - `e2e/`: Diretório onde os testes de integração são armazenados.
    - `fixtures/`: Arquivos de dados estáticos utilizados nos testes.
    - `plugins/`: Plugins e configurações adicionais para o Cypress.
    - `support/`: Comandos customizados e configurações globais.

## Como Executar os Testes

1. Clone o repositório:
     ```bash
     git clone https://github.com/luuspaiva/cypress-do-zero-a-nuvem.git
     ```
2. Instale as dependências:
     ```bash
     npm install
     ```
3. Execute os testes:
     ```bash
     npx cypress open para rodar em modo interativo (visual)

     npx cypress run para rodar modo headless
     ```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.
