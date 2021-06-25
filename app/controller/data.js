const express = require("express");
const mongoose = require("mongoose");
const { query } = require("../models/user");
mongoose.Promise = global.Promise;
var router = express.Router();

const UserSchema = require("../models/user");

// Importando o modela schema para a `const padrao`
const padrao = mongoose.model("User", UserSchema);

router
    // Rota principal em `/data`
    .route("/")

    // Metodo para selecionar todos os elementos do nosso banco de dados
    .get((_req, res) => {
        padrao.find((error, elementos) => {
            if (error)
                res.render("pages/error", {
                    title: "Error",
                    subtitle: "Infelizmente algo inesperado ocorreu",
                    error: error,
                });

            res.render("pages/data", {
                title: "Data",
                // Este valor vai para o desvio condicional do arquivo `data.ej`
                // ele é necessario por ser uma string que é ilógica existe ao ser cadastrada
                // por causa do limite de caracteres
                nicknameResult:
                    "__________________________________________________________________",
                data: elementos,
            });
        });
    });
    // Ao efetuar o `submit` no form no arquivo `data.ejs`
    // nos iremos pegar o query com uma (req), com isso iremos atrás 
    // do parametro nickname
    router.route("/search?:nickname")
    .get((req, res) => {
        padrao.find((error, elementos) => {
            if (error)
                res.render("pages/error", {
                    title: "Error",
                    subtitle: "Infelizmente algo inesperado ocorreu",
                    error: error,
                });

            res.render("pages/data", {
                title: "Results",
                nicknameResult: req.query.nickname,
                data: elementos,
            });
        });
    });

    module.exports = router;