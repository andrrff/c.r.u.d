const express = require("express");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var router = express.Router();
const Msg = require("../models/msg");
const UserSchema = require("../models/user");

const msg = new Msg();
const padrao = mongoose.model("Users", UserSchema);

router
    .route("/data/:produto_id")

    .get((req, res) => {
        padrao.findById(req.params.produto_id, function (error, produto) {
            if (error) 
                res.render("pages/error", {
                    title: msg.titleData,
                    subtitle: msg.titleData,
                    error: error,
                });

            res.render("pages/dataUnique", {
                title: msg.titleData,
                data: produto,
            });
        });
    })
router.route("/data/:produto_id/view_raw").get((req, res) => {
    padrao.findById(req.params.produto_id, function (error, produto) {
        if (error)
            res.render("pages/error", {
                title: msg.titleData,
                subtitle: msg.titleData,
                error: error,
            });

        res.send(produto, function (error) {
            console.log("Error : ", error);
        });
    });
});

router
    .route("/data/:produto_id/mode_edit")
    .get((req, res) => {
        padrao.find((error, _elementos) => {
            if (error)
                res.render("pages/error", {
                    title: msg.titleData,
                    subtitle: msg.titleData,
                    error: error,
                });


        });
        padrao.findById(req.params.produto_id, function (error, elemento) {
            if (error)
                res.render("pages/error", {
                    title: msg.titleData,
                    subtitle: msg.titleData,
                    error: error,
                });

            res.render("pages/edit", {
                title: "Data",
                data: elemento,
            });
        });
    })
    .put((req, res) => {
        padrao.find((error, elementos) => 
        {
            if (error)
                res.render("pages/error", {
                    title: msg.titleData,
                    subtitle: msg.titleData,
                    error: error,
                });
                padrao.findById(req.params.produto_id, (error, elemento) => {
                    if (error)
                        res.render("pages/error", {
                            title: msg.titleData,
                            subtitle: msg.titleData,
                            error: error,
                        });
                    //Guardamos o valor já presente no BD
                    var static_nickname = elemento.nickname;
                    var errorEqualsNick = false;
                    var currentdate = new Date();
                    var datetime =
                        currentdate.getDate() +
                        "/" +
                        (currentdate.getMonth() + 1) +
                        "/" +
                        currentdate.getFullYear() +
                        " - " +
                        (currentdate.getHours() - 3) +
                        ":" +
                        currentdate.getMinutes() +
                        ":" +
                        currentdate.getSeconds();

                    elemento.firstname = req.body.firstname;
                    elemento.lastname = req.body.lastname;
                    elemento.nickname = req.body.nickname;
                    elemento.address = req.body.address;
                    elemento.bio = req.body.bio;
                    elemento.dataUltima = datetime;

                    elementos.forEach((iterator) => {
                        if (
                            static_nickname != elemento.nickname &&
                            iterator.nickname == elemento.nickname ||
                            elemento.bio.length > 100 ||
                            elemento.nickname.length > 30
                        ) {
                            errorEqualsNick = true;
                        }
                    });
                    if (errorEqualsNick) {
                        res.render("pages/error", {
                            title: msg.titleData,
                            subtitle: msg.titleData,
                            error: msg.elementError,
                        });
                    } else {
                        elemento.save((_error) => {
                            res.render("pages/actionPage", {
                                title: msg.edited,
                            });
                        });
                    }
                });
        })
    });

        module.exports = router;