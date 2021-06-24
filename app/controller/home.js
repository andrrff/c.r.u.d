var express = require("express");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var router = express.Router();

const ProdutoSchema = require("../models/produto");

//Criando uma instancia das rotas via Express
// const router = express.Router();

const padrao = mongoose.model("Produtos", ProdutoSchema);

router.get("/", (_req, res) => {
    res.render("pages/index", {
        title: "Forms",
        subtitle: "Preencha corretamente os campos abaixo",
        notificacao: " ",
        tipoAlert: " ",
        svg: " ",
        alert: false,
    });
});

router.route("/").post((req, res) => {
    var produto = new padrao();
    var notificacao = String;
    var tipoAlert = String;
    var svg = String;
    var alert = Boolean;
    var block = Boolean;
    var currentdate = new Date();
    var datetime =
        currentdate.getDate() +
        "/" +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getFullYear() +
        " - " +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds();

    //Aqui vamos setar os campos do produto (via request):
    produto.firstname = req.body.firstname;
    produto.lastname = req.body.lastname;
    produto.nickname = req.body.username;
    produto.address = req.body.address;
    produto.bio = req.body.bio;
    produto.dataLancamento = datetime;
    padrao.find((error, produtos) => {
        if (error)
            res.render("pages/error", {
                title: "Error",
                subtitle: "Infelizmente algo inesperado ocorreu",
                error: error
            });

        produtos.forEach((element) => {
            if (element.nickname != produto.nickname) {
                notificacao = "Cadastro efeutuado com sucesso 😉!";
                tipoAlert = "alert-success";
                svg = "#check-circle-fill";
                alert = true;
                block = false;
            } else {
                notificacao = "Este nickname ja existe 😢!";
                tipoAlert = "alert-danger";
                svg = "#exclamation-triangle-fill";
                alert = true;
                block = true;
            }
        });
        if (!block) {
            produto.save((error) => {
                if (error)
                    res.send("Erro ao tentar salvar o Produto....: " + error);

                res.render("pages/index", {
                    title: "Forms",
                    subtitle: "Preencha corretamente os campos abaixo",
                    notificacao: notificacao,
                    tipoAlert: tipoAlert,
                    svg: svg,
                    alert: alert,
                });
            });
        } else {
            res.render("pages/index", {
                title: "Forms",
                subtitle: "Preencha corretamente os campos abaixo",
                notificacao: notificacao,
                tipoAlert: tipoAlert,
                svg: svg,
                alert: alert,
            });
        }
    });
});

module.exports = router;