var express = require("express");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var router = express.Router();

const UserSchema = require("../models/user");

const padrao = mongoose.model("User", UserSchema);

// Organização padrão para Home Page `index.ejs`
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

// POSTagem com os valores requeridos
router.route("/").post((req, res) => {
    var elemento = new padrao();
    var currentdate = new Date();
    var errorBool = false;
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

    //Aqui vamos setar os campos do elemento (via request):
    elemento.firstname = req.body.firstname;
    elemento.lastname = req.body.lastname;
    elemento.nickname = req.body.username;
    elemento.address = req.body.address;
    elemento.bio = req.body.bio;
    elemento.dataLancamento = datetime;
    elemento.dataUltima = datetime;
    padrao.find((error, elements) => {
        if (error)
            res.render("pages/error", {
                title: "Error",
                subtitle: "Infelizmente algo inesperado ocorreu",
                error: error
            });

        if(elements[0] != undefined)
        {
            elements.forEach((element) => {
            if (
                element.nickname == elemento.nickname ||
                elemento.bio.length > 100 ||
                elemento.nickname.length > 30
            )
                errorBool = true;
        });
            if(!errorBool){
                elemento.save((error) => {
                    if (error)
                        res.send(
                            "Erro ao tentar salvar o elemento....: " + error
                        );

                    res.render("pages/index", {
                        title: "Forms",
                        subtitle: "Preencha corretamente os campos abaixo",
                        notificacao: "Cadastro efeutuado com sucesso 😉!",
                        tipoAlert: "alert-success",
                        svg: "#check-circle-fill",
                        alert: true,
                    });
                });
            } else {
                res.render("pages/index", {
                    title: "Forms",
                    subtitle: "Preencha corretamente os campos abaixo",
                    notificacao:
                        "Ocorreu um erro no cadastro 😢!\n Possiveis causas:\n nickname já exitente;\n nickname muito grande; \nBio muito grande",
                    tipoAlert: "alert-danger",
                    svg: "#exclamation-triangle-fill",
                    alert: true,
                });
            }
        }
        else{
            elemento.save((error) => {
                if (error)
                    res.send("Erro ao tentar salvar o elemento....: " + error);

                res.render("pages/index", {
                    title: "Forms",
                    subtitle: "Preencha corretamente os campos abaixo",
                    notificacao: "Cadastro efeutuado com sucesso 😉!",
                    tipoAlert: "alert-success",
                    svg: "#check-circle-fill",
                    alert: true
                });
            });
        }
        
    });
});

module.exports = router;