const express = require('express');
const mongoose = require('mongoose');
const bunyan = require("bunyan");
mongoose.Promise = global.Promise;
const UserSchema = require("../models/user");
const padrao = mongoose.model("Users", UserSchema);
const Msg = require("../public/js/msg");
var log = bunyan.createLogger({ name: "crud" });

const msg = new Msg();

const router = express.Router();


router
    .route("/data/:user_id")
    .delete((req, res) => {
        // Removendo por parametro no caso o ID
        padrao.deleteOne(
            {
                _id: req.params.user_id,
            },
            (error) => {
                if (error)
                {
                    res.render("pages/error", {
                        title: msg.titleError,
                        error: error,
                    });
                    log.warn("DELETE -> /data/" + req.params.user_id + " ❌ - " + error);
                }
                
                router.route("/");
                res.render("pages/actionPage", { title: msg.deleted });
                log.info("DELETE -> /data/" + req.params.user_id + " ✅");
            }
        );
    });

module.exports = router;
