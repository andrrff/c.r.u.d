const express = require("express");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var router = express.Router();

const ProdutoSchema = require("../models/produto");

//Criando uma instancia das rotas via Express
// const router = express.Router();

const padrao = mongoose.model("Produtos", ProdutoSchema);

//Rotas que irão terminar em '/data/:produto_id' (servir tanto para: GET, PUT & DELETE: id):
router
    .route("/data/:produto_id")

    // 3) Método: GET por Id: (acessar em: GET http://localhost:8000/data/:produto_id)
    .get((req, res) => {
        //Função para poder Selecionar um determinado produto por ID - irá verificar se caso não encontrar um detemrinado
        //produto pelo id... retorna uma mensagem de error:
        padrao.findById(req.params.produto_id, function (error, produto) {
            if (error) 
                res.render("pages/error", {
                    title: "Error",
                    subtitle: "Infelizmente algo inesperado ocorreu",
                    error: error,
                });

            res.render("pages/dataUnique", {
                title: "Data",
                data: produto,
            });
        });
    })
router
    .route("/data/:produto_id/mode_edit")
    .get((req, res) => {
        padrao.find((error, produtos) => {
            if (error)
                res.render("pages/error", {
                    title: "Error",
                    subtitle: "Infelizmente algo inesperado ocorreu",
                    error: error,
                });


        });
        //Função para poder Selecionar um determinado produto por ID - irá verificar se caso não encontrar um detemrinado
        //produto pelo id... retorna uma mensagem de error:
        padrao.findById(req.params.produto_id, function (error, produto) {
            if (error)
                res.render("pages/error", {
                    title: "Error",
                    subtitle: "Infelizmente algo inesperado ocorreu",
                    error: error,
                });

            res.render("pages/edit", {
                title: "Data",
                data: produto,
            });
        });
    })
    // 4) Método: PUT por Id: (acessar em: PUT http://localhost:8000/data/:produto_id)
    .put((req, res) => {
        //Primeiro: para atualizarmos, precisamos primeiro achar 'Id' do 'Produto':
        padrao.find((error, produtos) => 
        {
            if (error)
                res.render("pages/error", {
                    title: "Error",
                    subtitle: "Infelizmente algo inesperado ocorreu",
                    error: error,
                });
                padrao.findById(req.params.produto_id, (error, produto) => {
                    if (error)
                        res.render("pages/error", {
                            title: "Error",
                            subtitle: "Infelizmente algo inesperado ocorreu",
                            error: error,
                        });
        
                    //Segundo:
                    produto.firstname = req.body.firstname;
                    produto.lastname = req.body.lastname;
                    produto.nickname = req.body.nickname;
                    produto.address = req.body.address;
                    produto.bio = req.body.bio;
        
                    //Terceiro: Agora que já atualizamos os dados, vamos salvar as propriedades:
                    var errorEqualsNick = false;

                    produtos.forEach(element => {
                        if(element.nickname == produto.nickname ||
                            produto.bio.length > 100 ||
                            produto.nickname.length > 30)
                        {
                            errorEqualsNick = true
                        }
                    });
                    if (errorEqualsNick) {
                        res.render("pages/error", {
                            title: "Error",
                            subtitle: "Infelizmente algo inesperado ocorreu",
                            error: " Possiveis causas:\n nickname já exitente;\n nickname muito grande; \nBio muito grande",
                        });
                    } else {
                        produto.save((_error) => {
                            res.render("pages/actionPage", {
                                title: "Item editado ✅",
                            });
                        });
                    }
                });
        })
    });

        module.exports = router;