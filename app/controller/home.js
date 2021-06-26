var express = require("express");
const mongoose = require("mongoose");
const bunyan = require("bunyan");
mongoose.Promise = global.Promise;
var router = express.Router();
var log = bunyan.createLogger({ name: "crud" });

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
    log.info("GET -> / ✅");
});

router.route("/").post((req, res) => {
    var elemento = new padrao();
    var errorBool = false;
    //Poderiamos usar este valor `new Date().toDateString() + " | " + new Date().toTimeString()`
    //que é mais legivel para o usuario, mas eu optei por não mudar o padrão do schema
    var currentdate = new Date();

    elemento.firstname = req.body.firstname;
    elemento.lastname = req.body.lastname;
    elemento.nickname = req.body.username;
    elemento.address = req.body.address;
    elemento.bio = req.body.bio;
    elemento.dataLancamento = currentdate;
    elemento.dataUltima = currentdate;
    padrao.find((error, elementos) => {
        if (error)
        {
            res.render("pages/error", {
                title: msg.titleError,
                subtitle: msg.subtitleError,
                error: error,
            });
            log.warn("POST -> / ❌ - " + error);
        }

        // Verificando se a collection existe
        if (elementos[0] != undefined) {
            elementos.forEach((element) => {
                if (
                    element.nickname == elemento.nickname ||
                    elemento.bio.length > 100 ||
                    elemento.nickname.length > 30
                    )
                        errorBool = true;
            });
            if (!errorBool)
            {
                elemento.save((error) => {
                    if (error)
                    {
                        res.send(msg.saveError + error);
                        log.warn("POST -> / ❌ - " + error);
                    } 
                    log.info("POST -> / ✅ - Bem-Vindo " + elemento.nickname);
                });
            }
            else
                log.warn("POST -> / ❌ - " + msg.elementError);
        } else
        {
            elemento.save((error) => {
                if (error)
                {
                    res.send("Erro ao tentar salvar o elemento....: " + error);
                    log.warn("POST -> / ❌ - " + error);
                }
                log.info("POST -> / ✅ - Bem-Vindo (" + elemento.nickname + ")");
            });
        }        
        //Render index + notificação
        const notificacao = new Notification(!errorBool);
        res.render("pages/index", {
            title: msg.titleForms,
            subtitle: msg.subtitleForms,
            notificacao: notificacao,
        });
    });
});

module.exports = router;
