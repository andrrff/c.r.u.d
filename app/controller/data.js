const express = require("express");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var router = express.Router();

const ProdutoSchema = require("../models/produto");

//Criando uma instancia das rotas via Express
// const router = express.Router();

const padrao = mongoose.model("Produtos", ProdutoSchema);


router
    .route("/")

    // 1) Método: Criar Produto (acessar em: POST http://localhost:8000/data)
    .post((_req, res) => {
        var produto = new padrao();

        //Aqui vamos setar os campos do produto (via request):
        produto.firstname = "###########";
        produto.lastname = "###########";
        produto.nickname = "defaultUser";
        produto.address = "###########";
        produto.bio = "###########";
        // res.render("../../views/pages/index");

        produto.save(function (error) {
            if (error)
                res.send("Erro ao tentar salvar o Produto....: " + error);

            res.json({ message: "Produto Cadastrado com Sucesso!" });
        });
    })

    // 2) Método: Selecionar Todos Produtos (acessar em: GET http://localhost:8000/data)
    .get((_req, res) => {
        padrao.find(function (error, produtos) {
            if (error)
                res.render("pages/error", {
                    title: "Error",
                    subtitle: "Infelizmente algo inesperado ocorreu",
                    error: error,
                });

            res.render("pages/data", {
                title: "Data",
                data: produtos,
            });
        });
    });

    module.exports = router;