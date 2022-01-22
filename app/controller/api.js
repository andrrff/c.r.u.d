const mongoose      = require("mongoose");
const bunyan        = require("bunyan");
var bodyParser      = require("body-parser").json();
var express         = require("express");
var router          = express.Router();
var log             = bunyan.createLogger({ name: "crud" });
mongoose.Promise    = global.Promise;

const UserSchema    = require("../models/user");
const Msg           = require("../public/js/msg");

const msg       = new Msg();
const padrao    = mongoose.model("User", UserSchema);

router.route("/post").post(bodyParser, (req, res) => {
    var isElegible  = true;
    req.body._users.forEach((user) => {
        log.info(user);
        var elemento    = new padrao();
        //Poderiamos usar este valor `new Date().toDateString() + " | " + new Date().toTimeString()`
        //que é mais legivel para o usuario, mas eu optei por não mudar o padrão do schema
        var currentdate = new Date();

        elemento.firstname      = user.firstname;
        elemento.lastname       = user.lastname;
        elemento.nickname       = user.nickname;
        elemento.address        = user.address;
        elemento.bio            = user.bio;
        elemento.dataLancamento = currentdate;
        elemento.dataUltima     = currentdate;

        padrao.find((error, elementos) => {
            if (error) {
                isElegible = false;
                res.send(msg.titleData + " | " + error);
                log.warn("POST -> /api/post ❌ - " + error);
            }

            // Verificando se a collection existe
            if (elementos[0] != undefined) {
                elementos.forEach((element) => {
                    if (
                        element.nickname == elemento.nickname ||
                        elemento.bio.length > 100 ||
                        elemento.nickname.length > 30
                    )
                        isElegible = false;
                });
                if (isElegible) {
                    elemento.save((error) => {
                        if (error) {
                            isElegible = false;
                            log.warn("POST -> /api/post ❌ - " + error);
                        }
                        log.info(
                            "POST -> /api/post ✅ - Bem-Vindo " +
                                elemento.nickname
                        );
                    });
                } else log.warn("POST -> /api/post ❌ - " + msg.elementError);
            } else {
                elemento.save((error) => {
                    if (error) {
                        isElegible = false;
                        log.warn("POST -> /api/post ❌ - " + error);
                    }
                    log.info(
                        "POST -> /api/post ✅ - Bem-Vindo (" +
                            elemento.nickname +
                            ")"
                    );
                });
            }
        });
    });
    if (isElegible) {
        res.send("Tudo ocorreu bem! ✅");
    } else {
        res.send("Ocorreu um erro ao criar os elemetos." + msg.elementError);
    }
});

router.route("/put").put(bodyParser, (req, res) => {
    padrao.find((error, elementos) => {
        if (error) {
            res.send(msg.titleData + " | " + error);
            log.warn(
                "PUT -> /api/put/" +
                    req.body._id +
                    " ❌ - " +
                    error
            );
        }
        padrao.findById(req.body._id, (error, elemento) => {
            if (error) {
                res.send(msg.titleData + " | " + error);
                log.warn(
                    "PUT -> /api/put/" +
                        req.body._id +
                        "❌ - " +
                        error
                );
            }
            //Guardamos o valor já presente no BD
            const static_nickname   = elemento.nickname;
            var isElegible          = false;
            //Poderiamos usar este valor `new Date().toDateString() + " | " + new Date().toTimeString()`
            // que é mais legivel para o usuario, mas eu optei por não mudar o padrão do schema
            var currentdate = new Date();

            elemento.firstname  = req.body.firstname;
            elemento.lastname   = req.body.lastname;
            elemento.nickname   = req.body.nickname;
            elemento.address    = req.body.address;
            elemento.bio        = req.body.bio;
            elemento.dataUltima = currentdate;

            elementos.forEach((iterator) => {
                if (
                    (static_nickname != elemento.nickname &&
                        iterator.nickname == elemento.nickname) ||
                    elemento.bio.length > 100 ||
                    elemento.nickname.length > 30
                )
                    isElegible = true;
            });
            if (isElegible) {
                res.send(msg.titleData + " | " + error);
                log.warn(
                    "PUT -> /api/put" +
                        req.body._id +
                        " ❌ - " +
                        msg.elementError
                );
            } else {
                elemento.save((_error) => {
                    res.send(msg.edited);
                });
                log.info("PUT -> /api/put" + req.body._id + " ✅");
            }
        });
    });
});

router.route("/delete")
    .delete((req, res) => {
        padrao.deleteMany(
            (error) => {
                if (error) {
                    res.send(msg.titleError + " | " + error);
                    log.warn(
                        "DELETE -> /api/data/ ❌"
                    );
                }

                router.route("/");
                res.send("Todos os itens foram deletados 🗑");
                log.info("DELETE -> /api/data/ ✅");
            }
        );
    });
router.route("/delete/:user_id")
    .delete((req, res) => {
        padrao.findById(req.params.user_id, (error, _elemento) => {
            if (error) {
                res.send(msg.titleError + " | " + error);
                log.warn("DELETE -> /api/delete/" + req.params.user_id + " ❌");
            }
            padrao.deleteOne(
                {
                    _id: req.params.user_id,
                },
                (error) => {
                    if (error) {
                        res.send(msg.titleError + " | " + error);
                        log.warn(
                            "DELETE -> /api/delete/" + req.params.user_id + " ❌"
                        );
                    }

                    router.route("/");
                    res.send(msg.deleted);
                    log.info(
                        "DELETE -> /api/delete/" + req.params.user_id + " ✅"
                    );
                }
            );
        });
    });

router.route("/get").get((_req, res) => {
    padrao.find((error, elementos) => {
        if (error) {
            res.send(msg.titleError + " | " + error);
            log.warn("GET -> /api/get ❌ - " + error);
        }
        res.send(elementos);
    });
});

module.exports = router;
