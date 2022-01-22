const UserSchema    = require("../models/user");
const express       = require("express");
const mongoose      = require("mongoose");
const bunyan        = require("bunyan");
const Msg           = require("../public/js/msg");
var router          = express.Router();
var log             = bunyan.createLogger({ name: "crud" });
mongoose.Promise    = global.Promise;

const msg       = new Msg();
const padrao    = mongoose.model("User", UserSchema);

router
    .route("/")
    .get((_req, res) => {
        padrao.find((error, elementos) => {
            if (error)
            {
                res.render("pages/error", {
                    title: msg.titleData,
                    subtitle: msg.titleData,
                    error: error,
                });
                log.warn("GET -> /data ❌ " + error)
            }
            res.render("pages/data", {
                title: msg.titleData,
                nicknameResult:
                    "",
                data: elementos,
            });
            log.info("GET -> /data ✅");
        });
    });

router
    .route("/search?:nickname")
    .get((req, res) => {
        padrao.find((error, elementos) => {
            if (error)
                res.render("pages/error", {
                    title: msg.titleData,
                    error: error,
                });

            res.render("pages/data", {
                title: msg.titleResults,
                nicknameResult: req.query.nickname,
                data: elementos,
            });
            log.info("GET -> /data/search?nickname=" + req.query.nickname + " ✅");
        });
    });

    module.exports = router;