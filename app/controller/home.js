var express = require("express");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var router = express.Router();

const UserSchema = require("../models/user");
const Notification = require("../public/js/notification");
const Msg = require("../public/js/msg");

const notificacao = new Notification(true);
const msg = new Msg();
const padrao = mongoose.model("User", UserSchema);

// Organização padrão para Home Page `index.ejs`
router.get("/", (_req, res) => {
    res.render("pages/index", {
        title: msg.titleForms,
        subtitle: msg.subtitleForms,
        notificacao: "",
    });
});

router.route("/").post((req, res) => {
    var elemento = new padrao();
    var errorBool = false;
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

    elemento.firstname = req.body.firstname;
    elemento.lastname = req.body.lastname;
    elemento.nickname = req.body.username;
    elemento.address = req.body.address;
    elemento.bio = req.body.bio;
    elemento.dataLancamento = datetime;
    elemento.dataUltima = datetime;
    padrao.find((error, elementos) => {
        if (error)
            res.render("pages/error", {
                title: msg.titleError,
                subtitle: msg.subtitleError,
                error: error
            });

        
        // Verificando se a collection está vazia
        if(elementos[0] != undefined)
        {
            elementos.forEach((element) => {
            if (
                element.nickname == elemento.nickname ||
                elemento.bio.length > 100 ||
                elemento.nickname.length > 30
            )
                errorBool = true;
        });
        const notificacao = new Notification(!errorBool);
            if(!errorBool){
                elemento.save((error) => {
                    if (error)
                        res.send(
                            msg.saveError + error
                        );
                    
                    res.render("pages/index", {
                        title: msg.titleForms,
                        subtitle: msg.subtitleForms,
                        notificacao: notificacao,
                    });
                });
            } else {
                res.render("pages/index", {
                    title: msg.titleForms,
                    subtitle: msg.subtitleForms,
                    notificacao: notificacao,
                });
            }
        }
        else{
            elemento.save((error) => {
                if (error)
                    res.send("Erro ao tentar salvar o elemento....: " + error);

                res.render("pages/index", {
                    title: msg.titleForms,
                    subtitle: msg.subtitleForms,
                    notificacao: notificacao
                });
            });
        }
        
    });
});

module.exports = router;