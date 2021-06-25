const express = require("express");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var router = express.Router();

const UserSchema = require("../models/user");

const padrao = mongoose.model("Users", UserSchema);

router
    // Rota
    .route("/data/:produto_id")

    // Este get será usado para pegar o elemento ID acessado
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
    // Rota de 
    .route("/data/:produto_id/mode_edit")
    .get((req, res) => {
        padrao.find((error, _elementos) => {
            if (error)
                res.render("pages/error", {
                    title: "Error",
                    subtitle: "Infelizmente algo inesperado ocorreu",
                    error: error,
                });


        });
        //Função para poder Selecionar um determinado produto por ID - irá verificar se caso não encontrar um detemrinado
        //produto pelo id... retorna uma mensagem de error:
        padrao.findById(req.params.produto_id, function (error, elemento) {
            if (error)
                res.render("pages/error", {
                    title: "Error",
                    subtitle: "Infelizmente algo inesperado ocorreu",
                    error: error,
                });

            res.render("pages/edit", {
                title: "Data",
                data: elemento,
            });
        });
    })
    // 4) Método: PUT por Id: (acessar em: PUT http://localhost:8000/data/:produto_id)
    .put((req, res) => {
        //Primeiro: para atualizarmos, precisamos primeiro achar 'Id' do 'Produto':
        padrao.find((error, elementos) => 
        {
            if (error)
                res.render("pages/error", {
                    title: "Error",
                    subtitle: "Infelizmente algo inesperado ocorreu",
                    error: error,
                });
                padrao.findById(req.params.produto_id, (error, elemento) => {
                    if (error)
                        res.render("pages/error", {
                            title: "Error",
                            subtitle: "Infelizmente algo inesperado ocorreu",
                            error: error,
                        });
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
                    var nickname = elemento.nickname;
                    //Segundo:
                    elemento.firstname = req.body.firstname;
                    elemento.lastname = req.body.lastname;
                    elemento.nickname = req.body.nickname;
                    elemento.address = req.body.address;
                    elemento.bio = req.body.bio;
                    elemento.dataUltima = datetime;
        
                    //Terceiro: Agora que já atualizamos os dados, vamos salvar as propriedades:
                    var errorEqualsNick = false;

                    elementos.forEach(iterator => {
                        if (
                            nickname != elemento.nickname && 
                            iterator.nickname == elemento.nickname ||
                            elemento.bio.length > 100 ||
                            elemento.nickname.length > 30
                        ) {
                            errorEqualsNick = true;
                        }
                    });
                    if (errorEqualsNick) {
                        res.render("pages/error", {
                            title: "Error",
                            subtitle: "Infelizmente algo inesperado ocorreu",
                            error: " Possiveis causas:\n nickname já exitente;\n nickname muito grande; \nBio muito grande",
                        });
                    } else {
                        elemento.save((_error) => {
                            res.render("pages/actionPage", {
                                title: "Item editado ✅",
                            });
                        });
                    }
                });
        })
    });

        module.exports = router;