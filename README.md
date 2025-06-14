# Teste Técnico RD Station

O objetivo principal do teste é implementar a lógica de recomendação de produtos RD Station.

## Tecnologias Utilizadas

Este projeto utiliza as seguintes tecnologias principais:

- React.js: Para o desenvolvimento do front-end
- json-server: Para simular um servidor RESTful com dados de produtos
- Tailwind CSS: Para estilização e layout responsivo

## Versão do Node.js

A versão do Node.js utilizada foi a 20.12.1, juntamente com o Yarn como gerenciador de pacotes. É recomendável utilizar a mesma versão ou uma versão compatível para evitar problemas de compatibilidade.

## Como Executar

1. Clone o repositório: `git clone <URL_DO_REPOSITORIO>`
2. Instale as dependências: `yarn install`
3. Para instalar o projeto, execute o script `./install.sh`
4. Inicie a aplicação: `yarn start`

### Scripts Disponíveis

- `start`: Inicia a aplicação React em modo de desenvolvimento.
- `start:frontend`: Inicia apenas a parte frontend da aplicação em modo de desenvolvimento.
- `start:backend`: Inicia apenas a parte backend da aplicação em modo de desenvolvimento.
- `dev`: Inicia simultaneamente a parte frontend e backend da aplicação em modo de desenvolvimento.

## Critérios de Aceite

Todos os critérios abaixo foram contemplados na realização do projeto:

1. O serviço de recomendação de produtos deve ser capaz de receber as preferências e funcionalidades desejadas do usuário através de um formulário.
2. O serviço deve retornar recomendações de produtos com base nas preferências e funcionalidades selecionadas pelo usuário.
3. Se o tipo de recomendação selecionado for "SingleProduct", o serviço deve retornar apenas um produto que corresponda melhor às preferências e funcionalidades do usuário.
4. Se o tipo de recomendação selecionado for "MultipleProducts", o serviço deve retornar uma lista de produtos que correspondam às preferências e funcionalidades do usuário.
5. Em caso de empate na seleção de produtos com base nas preferências e funcionalidades do usuário, o serviço deve retornar o último produto que atende aos critérios de seleção.
6. O serviço deve ser capaz de lidar com diferentes tipos de preferências e funcionalidades selecionadas pelo usuário.
7. O serviço deve ser modular e facilmente extensível para futuras atualizações e adições de funcionalidades.

## Estrutura do Projeto Frontend

A estrutura do projeto frontend está organizada da seguinte forma:

```
src/
│
├── data/                      # Camada de dados (API, services, lógica de domínio)
│   ├── config/                # Configurações globais (axios, envs)
│   │   ├── api.config.js
│   │   └── env.config.js
│   └── modules/              # Domínios da aplicação
│       ├── products/         # Lógica relacionada a produtos
│       └── recommendations/  # Lógica de recomendações
│
├── presentation/             # Camada de apresentação (componentes visuais e containers)
│   ├── components/           # Componentes visuais reutilizáveis
│   │   ├── base/             # Componentes genéricos e reutilizáveis (ex: Radio, Checkbox)
│   │   ├── Form/             # Componentes específicos do formulário
│   │   └── RecommendationList/ # Componente de lista de recomendações
│   └── App.js                # Entry point visual da aplicação
│
├── shared/                   # Código compartilhado entre camadas
│   └── hooks/                # Hooks customizados reutilizáveis
│       ├── useForm.js
│       └── index.js

```

## Arquivos importantes

1. [`src/presentation/App.js`](frontend/src/presentation/App.js)  
   Responsável por **atualizar dinamicamente a lista de recomendações** com base nos dados enviados pelo formulário.  
   ✅ Lógica reorganizada para refletir a nova estrutura de componentes e hooks.

2. [`src/presentation/components/Form/Form.component.js`](frontend/src/presentation/components/Form/Form.component.js)  
   Gerencia a **lógica de entrada do usuário**, incluindo seleção de preferências, funcionalidades e tipo de recomendação.  
   ✅ Componente refatorado, modularizado e com testes unitários implementados.

3. [`src/data/modules/recommendations/services/recommendation.service.js`](frontend/src/data/modules/recommendations/services/recommendation.service.js)  
   Contém a **lógica de negócio responsável por gerar as recomendações** com base nas escolhas feitas pelo usuário.  
   ✅ Serviço isolado e testado, preparado para futura evolução (ex: novas regras ou critérios de recomendação).

### Sobre a função que gera as recomendações

Optei por **indexar o catálogo (produtos) em um `Map`/`WeakMap` – estruturas que o JavaScript implementa como _hash tables_**.  
Dessa forma, cada frase (feature ou preference) se torna uma chave única que aponta diretamente para o produto correspondente em **O(1)**.

| Etapa                    | Complexidade                            | O que acontece                                                                                        |
| ------------------------ | --------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Construção do índice** | **O(N)** · executada apenas **uma vez** | Percorremos o array de produtos, geramos o hash para cada frase e armazenamos no `Map`.               |
| **Recomendação**         | **O(k)** (k = n° de itens selecionados) | Buscamos as chaves no hash table e pontuamos; não há loop sobre o catálogo completo em cada consulta. |

```text
Busca não otimizada (varrer catálogo inteiro a cada submit):  O(N)  por chamada
Implementação com hash table: O(N) uma única vez  +  O(k) por chamada
```

#### WeakMap e closure

Mantenho o índice, em que a chave é o array de produtos, em um **WeakMap** que vive dentro de um **closure** (gerado por um IIFE, função anônima declarada e invocada).  
_Closure_ significa que as variáveis daquele escopo permanecem na memória enquanto alguma função interna ainda as usa.  
Já o `WeakMap` garante que, quando o array de produtos perder a referência, o garbage collector libera seu espaço, assim temos cache persistente, sem variáveis globais e sem vazamento de memória.

## Convenções de Componentes

Para manter consistência e escalabilidade, cada componente possui sua própria pasta contendo:

- `Componente.component.js` – arquivo principal do componente
- `index.js` – reexporta o componente para facilitar os imports
- `Componente.test.js` _(opcional)_ – testes unitários relacionados

Isso abre possibilidades para futuras expansões, como a adição de estilos específicos, arquivo de tipagens (ao inserir TypeScript) e a implementação de algum pattern como Container/Presentational ou Smart/Dumb Components.

## Testes unitários

Foram implementados **8 arquivos de testes unitários**, cobrindo os principais códigos do projeto. Os testes garantem que a **lógica de recomendação** funcione corretamente e que os **componentes renderizem conforme esperado**.

### Arquivos de testes:

- [`SubmitButton.test.js`](frontend/src/presentation/components/Form/SubmitButton/SubmitButton.test.js)
- [`Form.test.js`](frontend/src/presentation/components/Form/Form.test.js)
- [`RecommendationType.test.js`](frontend/src/presentation/components/Form/Fields/RecommendationType/RecommendationType.test.js)
- [`Preferences.test.js`](frontend/src/presentation/components/Form/Fields/Preferences/Preferences.test.js)
- [`Features.test.js`](frontend/src/presentation/components/Form/Fields/Features/Features.test.js)
- [`RecommendationList.test.js`](frontend/src/presentation/components/RecommendationList/RecommendationList.test.js)
- [`recommendation.service.test.js`](frontend/src/data/modules/recommendations/services/recommendation.service.test.js)
- [`useProducts.test.js`](frontend/src/data/modules/products/useCases/useProducts.test.js)

Todos os testes estão passando ✅

## Layout e experiência do usuário

A partir da aplicação original, foram feitas melhorias significativas no layout e na experiência do usuário:

- **Responsividade**: O layout foi adaptado para funcionar bem em diferentes tamanhos de tela, garantindo uma boa experiência tanto em dispositivos móveis quanto em desktops.
- **Estilização com Tailwind CSS**: Utilizando o Tailwind CSS, o design foi aprimorado para ser mais moderno e intuitivo, com foco na usabilidade.
- **Experiência do usuário**: Implementados feedbacks visuais (como loading e mensagens), além de melhorias de usabilidade para otimizar a interação com o formulário e as recomendações.

## Melhorias futuras

- Adicionar TypeScript para melhorar consistência do código e facilitar a manutenção.
- Adicionar React Query para otimizar requisições para a API e melhorar o gerenciamento de estado.
- Como cada componente já está organizado em sua própria pasta, é possível implementar algum pattern como Container/Presentational ou Smart/Dumb Components para separar lógica de apresentação.
- Adicionar alias, como `@components`, `@hooks`, etc., para facilitar os imports e melhorar a legibilidade do código.
- Fazer a migração do react-scripts para o Vite, que é mais leve e rápido, melhorando a performance do projeto.
- Atualizar o Tailwind CSS para a versão 4.
- Ampliar ainda mais a cobertura dos testes unitários e adicionar testes de integração com Cypress.

## Formatação e lint de código

Para garantir a consistência e padronização do código, foram integrados o Prettier e o ESLint, que foi atualizado da versão 8 para a versão 9. O plugin do Prettier foi incorporado ao ESLint, assegurando que as regras de formatação sejam aplicadas automaticamente ao executar o `eslint --fix`. Além disso, foi adicionado um plugin para ordenar os imports de forma automática, contribuindo para uma base de código mais limpa e organizada.

## Considerações finais

Procurei focar os esforços na implementação da lógica de recomendação e os testes unitários associados, garantindo que o sistema funcione conforme os critérios de aceite. Também foquei em melhorar a experiência do usuário e o layout, utilizando o Tailwind CSS para estilização. Fiz a implementação de mais testes unitários para garantir a qualidade do código e a confiabilidade das funcionalidades. Mudanças mais estruturais, como a migração para TypeScript, React Query e Vite, foram deixadas para uma futura evolução do projeto.

## Autor

Desenvolvido por Felipe Cechin
