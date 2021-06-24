const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Produto = require("../models/produto");
mongoose.Promise = global.Promise;
const path = require('path');
const ProdutoSchema = require("../models/produto");
// const Form = require("../public/js/post");


//Criando uma instancia das rotas via Express
const router = express.Router();

//Rota com uma mensagem de exemplo :)
router.get("/", (req, res) => {
    // res.render()
    // res.render("../../views/pages/index");
    res.json({ message: "Ok!" });
    // res.sendFile(path.join(__dirname + "../../../index.html"));
});

//Padrao de rotas
// app.use("/api", router); 
// var padrao = mongoose.model("Produtos", schema);
const padrao = mongoose.model("Produtos", ProdutoSchema);
// concat(item.artwork);
// let people = ["geddy", "neil", "alex"];

router
    .route("/data")

    /* 1) Método: Criar Produto (acessar em: POST http://localhost:8000/api/produtos)  */
    .post((req, res) => {
        var produto = new padrao();

        //Aqui vamos setar os campos do produto (via request):
        produto.firstname = '###########';
        produto.lastname = "###########";
        produto.nickname = "defaultUser";
        produto.address = '###########';
        produto.bio = "###########";
        // res.render("../../views/pages/index");

        produto.save(function (error) {
            if (error)
                res.send("Erro ao tentar salvar o Produto....: " + error);

            res.json({ message: "Produto Cadastrado com Sucesso!" });
        });
    })

    /* 2) Método: Selecionar Todos Produtos (acessar em: GET http://localhost:8000/api/produtos)  */
    .get((req, res) => {
        padrao.find(function (error, produtos) {
            if (error)
                res.send(
                    "Erro ao tentar Selecionar Todos os produtos...: " + error
                );

            res.render("pages/data", {
                title: 'Data',
                data: produtos
            });
        });
    });

//Rotas que irão terminar em '/produtos/:produto_id' (servir tanto para: GET, PUT & DELETE: id):
router
    .route("/data/:produto_id")

    /* 3) Método: Selecionar por Id: (acessar em: GET http://localhost:8000/api/produtos/:produto_id) */
    .get((req, res) => {
        //Função para poder Selecionar um determinado produto por ID - irá verificar se caso não encontrar um detemrinado
        //produto pelo id... retorna uma mensagem de error:
        padrao.findById(req.params.produto_id, function (error, produto) {
            if (error) res.send("Id do Produto não encontrado....: " + error);

            res.render("pages/dataUnique", {
                title: "Data",
                data: produto,
            });
        });
    })

    /* 4) Método: Atualizar por Id: (acessar em: PUT http://localhost:8000/api/produtos/:produto_id) */
    .put((req, res) => {
        //Primeiro: para atualizarmos, precisamos primeiro achar 'Id' do 'Produto':
        padrao.findById(req.params.produto_id, function (error, produto) {
            if (error) res.send("Id do Produto não encontrado....: " + error);

            //Segundo:
            produto.firstname = req.body.firstname;
            produto.lastname = req.body.lastname;
            produto.nickname = req.body.nickname;
            produto.address = req.body.address;
            produto.bio = req.body.bio;

            //Terceiro: Agora que já atualizamos os dados, vamos salvar as propriedades:
            produto.save(function (error) {
                if (error)
                    res.send("Erro ao atualizar o produto....: " + error);

                res.json({ message: "Produto atualizado com sucesso!" });
            });
        });
    })

    /* 5) Método: Excluir por Id (acessar: http://localhost:8000/api/produtos/:produto_id) */
    .delete((req, res) => {
        padrao.remove(
            {
                _id: req.params.produto_id,
            },
            function (error) {
                if (error)
                    res.send("Id do Produto não encontrado....: " + error);

                router.route('/');
                res.render('pages/delete',
                {title: "Item deletado"})
            }
        );
    });


module.exports = router;
