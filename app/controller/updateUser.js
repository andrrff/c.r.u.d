const express = require("express");
const mongoose = require("mongoose");
const bunyan = require("bunyan");
mongoose.Promise = global.Promise;
var router = express.Router();
const Msg = require("../public/js/msg");
const UserSchema = require("../models/user");
var log = bunyan.createLogger({ name: "crud" });

const msg = new Msg();
const padrao = mongoose.model("Users", UserSchema);

router
    .route("/data/:produto_id")
    .get((req, res) => {
        padrao.findById(req.params.produto_id, function (error, produto) {
            if (error) 
            {
                res.render("pages/error", {
                    title: msg.titleData,
                    error: error
                });
                log.warn(
                    "GET -> /data/" + req.params.produto_id + " ❌ - " + error
                );
            }

            res.render("pages/dataUnique", {
                title: msg.titleData,
                data: produto,
            });
            log.info("GET -> /data/" + req.params.produto_id + " ✅");
        });
    })
router.route("/data/:produto_id/view_raw").get((req, res) => {
    padrao.findById(req.params.produto_id, function (error, produto) {
        if (error)
        {
            res.render("pages/error", {
                title: msg.titleData,
                error: error,
            });
            log.warn("GET -> /data/" + req.params.produto_id + "/view_raw ❌ - " + error);
        }

        res.send(produto, function (error) {
            log.warn("Error : ", error);
        });
        log.info("GET -> /data/" + req.params.produto_id + "/view_raw ✅");
    });
});

router
    .route("/data/:produto_id/mode_edit")
    .get((req, res) => {
        padrao.find((error, _elementos) => {
            if (error)
            {
                res.render("pages/error", {
                    title: msg.titleData,
                    error: error,
                });
                log.warn("GET -> /data/" + req.params.produto_id + "/mode_edit ❌ - " + error);
            }
            log.info("GET -> /data/" + req.params.produto_id + "/mode_edit ✅");
        });
        padrao.findById(req.params.produto_id, function (error, elemento) {
            if (error)
            {
                res.render("pages/error", {
                    title: msg.titleData,
                    error: error,
                });
            }

            res.render("pages/edit", {
                title: msg.titleData,
                data: elemento,
            });
            log.info("Você está modificando o usuário (" + elemento.nickname + ")");
        });
    })
    .put((req, res) => {
        padrao.find((error, elementos) => 
        {
            if (error)
            {
                res.render("pages/error", {
                    title: msg.titleData,
                    error: error,
                });
                log.warn("PUT -> /data/" + req.params.produto_id + "/mode_edit ❌ - " + error);
            }
                padrao.findById(req.params.produto_id, (error, elemento) => {
                    if (error)
                    {
                        res.render("pages/error", {
                            title: msg.titleData,
                            error: error,
                        });
                        log.warn("PUT -> /data/" + req.params.produto_id + "/mode_edit ❌ - " + error);
                    }
                    //Guardamos o valor já presente no BD
                    const static_nickname = elemento.nickname;
                    var errorEqualsNick = false;
                    //Poderiamos usar este valor `new Date().toDateString() + " | " + new Date().toTimeString()`
                    // que é mais legivel para o usuario, mas eu optei por não mudar o padrão do schema
                    var currentdate = new Date();

                    elemento.firstname = req.body.firstname;
                    elemento.lastname = req.body.lastname;
                    elemento.nickname = req.body.nickname;
                    elemento.address = req.body.address;
                    elemento.bio = req.body.bio;
                    elemento.dataUltima = currentdate;

                    elementos.forEach((iterator) => {
                        if (
                            static_nickname != elemento.nickname &&
                            iterator.nickname == elemento.nickname ||
                            elemento.bio.length > 100 ||
                            elemento.nickname.length > 30
                            )
                                errorEqualsNick = true;
                    });
                    if (errorEqualsNick)
                    {
                        res.render("pages/error", {
                            title: msg.titleData,
                            error: msg.elementError,
                        });
                        log.warn("PUT -> /data" + req.params.produto_id + "/mode_edit ❌ - " + msg.elementError);
                    }
                    else
                    {
                        elemento.save((_error) => {
                            res.render("pages/actionPage", {
                                title: msg.edited,
                            });
                        });
                        log.info("PUT -> /data" + req.params.produto_id + "/mode_edit ✅");
                    }
                });
        })
    });

        module.exports = router;