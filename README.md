# Create.Read.Update.Delete - C.R.U.D

[![Website](https://img.shields.io/website?up_message=livedemo&url=https%3A%2F%2Fcrud-andrrff.herokuapp.com%2F)](https://crud-andrrff.herokuapp.com/)
[![GitHub repo size](https://img.shields.io/github/repo-size/andrrff/c.r.u.d)](https://github.com/andrrff/c.r.u.d) 
[![GitHub](https://img.shields.io/github/license/andrrff/c.r.u.d)](https://github.com/andrrff/c.r.u.d/blob/master/LICENSE) 

____

## Comandos
```
npm start
```
porta:
```
localhost
```

> Caso não funcionar pode ser porque você não tenha o Bunyan
> [link](https://www.npmjs.com/package/bunyan)
```
npm i -g bunyan
```

____

## Modelo
- `id`: Numero de indentificação único(gerado auto pelo MongoBD Atlas);
- `firstName`: _String_ referenciando o primeiro nome;
- `lastName`: _String_ referenciando o segundo/último nome;
- `nickname`: _String_ de identificação único à escolha do usuário;
- `address`: _String_ referenciando o endereço;
- `bio`: Uma breve descrição sobre o usuário em _String_;
- `dataLancamento`: Data da criação, no tipo padrão _Date_;
- `dataUltima`: Data da ultima modificação, no tipo padrão _Date_;

[mais sobre...](https://github.com/andrrff/c.r.u.d/blob/master/app/models/user.js)
____

## Métodos

- ### Cadastro(register user)

| Method     | URI                               | File                         | View                      |
|------------|-----------------------------------|------------------------------|---------------------------|
| `GET`      | `/`                               | [`app\controller\home.js`](https://github.com/andrrff/c.r.u.d/blob/master/app/controller/home.js#L16)     | [`views/pages/index.ejs`](https://github.com/andrrff/c.r.u.d/blob/master/app/views/pages/index.ejs)   |
| `POST`     | `/`                               | [`app\controller\home.js`](https://github.com/andrrff/c.r.u.d/blob/master/app/controller/home.js#L25)     | [`views/pages/index.ejs`](https://github.com/andrrff/c.r.u.d/blob/master/app/views/pages/index.ejs)   |

- ### Data(get users)

| Method     | URI                               | File                         | View                      |
|------------|-----------------------------------|------------------------------|---------------------------|
| `GET/HEAD` | `/data`                           | [`app\controller\data.js`](https://github.com/andrrff/c.r.u.d/blob/master/app/controller/data.js#L15)     | [`views/pages/data.ejs`](https://github.com/andrrff/c.r.u.d/blob/master/app/views/pages/data.ejs)    |
| `GET/HEAD` | `/data/search?:nickname`          | [`app\controller\data.js`](https://github.com/andrrff/c.r.u.d/blob/master/app/controller/data.js#L38)     | [`views/pages/data.ejs`](https://github.com/andrrff/c.r.u.d/blob/master/app/views/pages/data.ejs)    |

- ### Editar Usuário(update user)

| Method     | URI                               | File                         | View                      |
|------------|-----------------------------------|------------------------------|---------------------------|
| `GET/HEAD` | `/data/:user_id`               | [`app\controller\updateUser.js`](https://github.com/andrrff/c.r.u.d/blob/master/app/controller/updateUser.js#L15)| [`views/pages/dataUnique.ejs`](https://github.com/andrrff/c.r.u.d/blob/master/app/views/pages/dataUnique.ejs)|
| `GET/HEAD` | `/data/:user_id/view_raw`      | [`app\controller\updateUser.js`](https://github.com/andrrff/c.r.u.d/blob/master/app/controller/updateUser.js#L35)| [`resource.send(user.json)`]  |
| `GET/HEAD` | `/data/:user_id/mode_edit`     | [`app\controller\updateUser.js`](https://github.com/andrrff/c.r.u.d/blob/master/app/controller/updateUser.js#L56)| [`views/pages/edit.ejs`](https://github.com/andrrff/c.r.u.d/blob/master/app/views/pages/edit.ejs)      |
| `PUT`      | `/data/:user_id/mode_edit`     | [`app\controller\updateUser.js`](https://github.com/andrrff/c.r.u.d/blob/master/app/controller/updateUser.js#L75)| [`views/pages/actionPage.ejs`](https://github.com/andrrff/c.r.u.d/blob/master/app/views/pages/actionPage.ejs)      |

- ### Delete Usuário(delete user)

| Method     | URI                               | File                         | View                      |
|------------|-----------------------------------|------------------------------|---------------------------|
| `DELETE`   | `/data/:user_id`               | [`app\controller\deleteUser.js`](https://github.com/andrrff/c.r.u.d/blob/master/app/controller/deleteUser.js#L17)| [`views/pages/actionPage.ejs`](https://github.com/andrrff/c.r.u.d/blob/master/app/views/pages/actionPage.ejs)|

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

#### `app/controller/doc.js`
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

## Ferramentas usadas:
  - [method-override](https://www.npmjs.com/package/method-override)
  - [Mongoose](https://mongoosejs.com/docs/guide.html)
  - [MongoDB](https://docs.mongodb.com)
  - [nodemon](https://nodemon.io)
  - [Expressjs](https://expressjs.com/en/guide/routing.html)
  - [request](https://www.npmjs.com/package/request)
  - [bunyan](https://www.npmjs.com/package/bunyan)
  - [Heroku](https://circleci.com/docs/?utm_source=google&utm_medium=cpc&utm_content=docs&utm_campaign=sitelinkDocs&gclid=Cj0KCQjw2tCGBhCLARIsABJGmZ7Q9doxkThadrBOGJD7FARqVgGL5D-C-deNRsJOGjqMYkhsEQ9cKmAaAhP0EALw_wcB)
  - [ejs](https://ejs.co/#docs)
  
____

## [Livedemo](https://crud-andrrff.herokuapp.com/)
