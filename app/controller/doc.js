const express = require("express");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// Criando uma instancia das rotas via Express
const router = express.Router();

router.route("/").get((_req, res) => {
    res.render("pages/doc", {
        title: "Documentação",
        subtitle: "Bem-vindo ao live-demo do meu CRUD 😊",
        notificacao: " Clique no header azul em algum item da rota `/data/` para ter mais opções de administração.",
        tipoAlert: "alert-primary",
        svg: "#info-fill",
        alert: true,
    });
});

module.exports = router;
