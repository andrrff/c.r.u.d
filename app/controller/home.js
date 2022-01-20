const mongoose      = require("mongoose");
const bunyan        = require("bunyan");
var bodyParser      = require("body-parser").json();
var express         = require("express");
mongoose.Promise    = global.Promise;
var router          = express.Router();
var log             = bunyan.createLogger({ name: "crud" });

const UserSchema    = require("../models/user");
const Notification  = require("../public/js/notification");
const Msg           = require("../public/js/msg");

const msg       = new Msg();
const padrao    = mongoose.model("User", UserSchema);

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
    var elemento    = new padrao();
    var errorBool   = false;
    //Poderiamos usar este valor `new Date().toDateString() + " | " + new Date().toTimeString()`
    //que é mais legivel para o usuario, mas eu optei por não mudar o padrão do schema
    var currentdate = new Date();



    elemento.firstname      = req.body.firstname;
    elemento.lastname       = req.body.lastname;
    elemento.nickname       = req.body.username;
    elemento.address        = req.body.address;
    elemento.bio            = req.body.bio;
    elemento.dataLancamento = currentdate;
    elemento.dataUltima     = currentdate;
    padrao.find((error, elementos) => {
        if (error)
        {
            res.render("pages/error", {
                title: msg.titleError,
                error: error,
            });
            log.warn("POST -> / ❌ - " + error);
        }

        // Verificando se a collection existe
        if (elementos[0] != undefined) {
            elementos.forEach((element) => {
                if (element.nickname            == elemento.nickname    ||
                    elemento.bio.length         > 100                   ||
                    elemento.nickname.length    > 30
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

router.route("/post").post(bodyParser, (req, res) => {
    var elemento = new padrao();
    var isElegible = true;
    //Poderiamos usar este valor `new Date().toDateString() + " | " + new Date().toTimeString()`
    //que é mais legivel para o usuario, mas eu optei por não mudar o padrão do schema
    var currentdate = new Date();

    elemento.firstname = req.body.firstname;
    elemento.lastname = req.body.lastname;
    elemento.nickname = req.body.nickname;
    elemento.address = req.body.address;
    elemento.bio = req.body.bio;
    elemento.dataLancamento = currentdate;
    elemento.dataUltima = currentdate;
    padrao.find((error, elementos) => {
        if (error) {
            res.render("pages/error", {
                title: msg.titleError,
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
                    isElegible = false;
            });
            if (isElegible) {
                elemento.save((error) => {
                    if (error) {
                        res.send(msg.saveError + error);
                        log.warn("POST -> /post ❌ - " + error);
                    }
                    log.info("POST -> /post ✅ - Bem-Vindo " + elemento.nickname);
                });
            } else log.warn("POST -> /post ❌ - " + msg.elementError);
        } else {
            elemento.save((error) => {
                if (error) {
                    res.send("Erro ao tentar salvar o elemento....: " + error);
                    log.warn("POST -> /post ❌ - " + error);
                }
                log.info(
                    "POST -> /post ✅ - Bem-Vindo (" + elemento.nickname + ")"
                );
            });
        }
        if (isElegible)
        {
            res.send("Bem - Vindo(" + elemento.nickname + ")");
        }
        else
        {
            res.send("Erro ao tentar criar o elemento." + msg.elementError);
        }
    });
});

router.route("/update").put(bodyParser, (req, res) => {
    var isElegible = false;
        padrao.find((error, elementos) => 
        {
            if (error)
            {
                res.render("pages/error", {
                    title: msg.titleData,
                    error: error,
                });
                log.warn("PUT -> /update (id:" + req.body._id + ") ❌ - " + error);
            }
                padrao.findById(req.body._id, (error, elemento) => {
                    if (error) {
                        res.send("pages/error", {
                            title: msg.titleData,
                            error: error,
                        });
                        log.warn(
                            "PUT -> /update (id:" +
                                req.body._id +
                                ") ❌ - " +
                                error
                        );
                    }
                    //Guardamos o valor já presente no BD
                    const static_nickname = elemento.nickname;
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
                            (static_nickname != elemento.nickname &&
                                iterator.nickname == elemento.nickname) ||
                            elemento.bio.length > 100 ||
                            elemento.nickname.length > 30
                        )
                            isElegible = true;
                    });
                    if (isElegible) {
                        res.send("pages/error", {
                            title: msg.titleData,
                            error: msg.elementError,
                        });
                        log.warn(
                            "PUT -> /update (id:" +
                                req.body._id +
                                ") ❌ - " +
                                error
                        );
                    } else {
                        elemento.save((_error) => {
                            res.send(msg.edited);
                        });
                        log.warn("PUT -> /update (id:" + req.body._id + ") ✅");
                    }
                });
        })
    });

router.route("/data_raw").get((req, res) => {
    padrao.find((error, elementos) => {
        if (error) {
            res.render("pages/error", {
                title: msg.titleError,
                error: error,
            });
            log.warn("GET -> /data_raw ❌ - " + error);
        }
        res.send(elementos)
    });
});

module.exports = router;