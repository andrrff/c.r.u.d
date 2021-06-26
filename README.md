# Create.Read.Update.Delete - C.R.U.D

[![Website](https://img.shields.io/website?up_message=livedemo&url=https%3A%2F%2Fcrud-andrrff.herokuapp.com%2F)](https://crud-andrrff.herokuapp.com/)
[![GitHub repo size](https://img.shields.io/github/repo-size/andrrff/c.r.u.d)](https://github.com/andrrff/c.r.u.d) 
[![GitHub](https://img.shields.io/github/license/andrrff/c.r.u.d)](https://github.com/andrrff/c.r.u.d/blob/master/LICENSE) 

____

## Comando
```
npm start
```
porta:
```
localhost
```

> Caso não funcionar pode ser porque você não tenha o Bunyan
> [bunyan](https://www.npmjs.com/package/bunyan)
```
npm i -g bunyan
```

____

## Regras
- Somente UM nickname pode existir
- O nickname deve ter no máximo 30 caracteres
- A bio deve ter no máximo 100 caracteres
`OBS* Estas regras devem ser seguidas à risca!`

____

## Router
### Resumo
Usei o expressjs e foi tudo muito simples a construção de rotas com ele, usando o Design Pattern `MVC` (Model, View and Controller). As rotas estão na pasta `app/controller`, ainda falta uma organizada a mais, para separar as rotas propriamente ditas das "funcoes", no caso `DELETE` e `PUT`.

### Arquivos
#### `app/controller/home.js`
Este arquivo é o responsável pela pagina inicial da aplicação, a sua principal função e realizar o `POST`, no caso seria a criação de um novo usuário, mas não é somente isso, ele faz a comparação com outros elementos dentro database, por isso, usa-se também o método `GET` para fazer a parte lógica.

#### `app/controller/data.js`
Depois que temos um usuário registrado, os dados dentro do MongoDB, são extraídos usando o método `GET`(a interação com o MongoDB é feita com o Mongoose), este arquivo é o responsável pelo redirecionamento para rota de um ID específico, saíndo do arquivo `data.ejs` para o `dataUnique.ejs`, sem contar a caixa de pesquisa, em que usa-se o query.

### `app/controller/doc.js`
Bom... Você já deve desconfiar o que ela faz, usando o metodo `GET` mas apenas para um pequeno render, por que como nós usamos páginas modularizadas, temos que está destribuindo "props" para elas terem valores e preencherem os itens, como por exemplo a palavra "Documentação", ela é um `< % = title % > `, mas que dentro do arquivo doc recebe uma valor para ser retornada no arquivo ".ejs", este conceito se aplica à todos os outrs itens sitados anteriormente.

#### `app/controller/deleteUser.js` && `app/controller/updateUser.js`
Que bom que ainda está lendo isso, chegamos nos dois arquivos que usam de metodos muito importantes, o `PUT` e o `DELETE`, quando saímos da rota `data/:id`, ela nos redireciona para duas possíveis escolhas "Editar" e "Deletar", em que se encontram no `updateUser.js` e `deleteUser.js` respectivamente, para usa-los, temos que importar o `method-override` no meu caso estou usando a versão ^3.0.0, com tudo isso faremos remoções e modificações, sendo as modificações uma parte mais chatinha de colocar nossa logica na aplicação seguindo nossas regras.

#### `app.js`
Este e o arquivo principal, ele é o responsável por conectar tudo que usaremos, nas pastas views, controller e os models.

____

## FAQs
- Como adicionar um item no database?
  - Vá para pagina Home
  - Insira seus dados corretamente no formulário
  - Clique no botão `Submit`
  - Voa lá🎉, seus dados ja podem ser consultados na rota `/data`
- Como faço para editar um item no database?
  - Clique no item Data na navbar
  - Selecione o item que queira modificar
  - Clique no botão `Editar`
  - E agora você pode modificar o que quiser
  - Clique no botão confirmar e pronto o item desejado ja foi modificado 😉
- Como faço para deletar um item no database?
  - Clique no item Data na navbar
  - Selecione o item que queira deletar
  - Clique no botão `Deletar`
  - ATENÇÃO❗❗❗ O ITEM QUANDO DELETADO NÃO PODE MAIS SER RECUPERADO

____

## [Livedemo](https://crud-andrrff.herokuapp.com/)
