const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const UserSchema = require("../models/user");

//Criando uma instancia das rotas via Express
const router = express.Router();

const padrao = mongoose.model("Users", UserSchema);

// Instancia de rota
router
    // Rota usada no arquivo `dataUnique.ejs` em que nos somos direcionados
    // a ela pelo arquivo `data.ejs` onda na form temos o primeiro botão
    // que faz nos pararmos aqui
    .route("/data/:produto_id")
    // Usando o `method-override` para fazer a ação de DELETE ao clicar 
    // no botão vermelho
    .delete((req, res) => {
        // Removendo por parametro no caso o ID
        padrao.remove(
            {
                _id: req.params.produto_id,
            },
            (error) => {
                if (error)
                    res.render("pages/error", {
                        title: "Error",
                        subtitle: "Infelizmente algo inesperado ocorreu",
                        error: error,
                    });
                
                // Pagina de ação `actionPage.ejs` foi o nome que eu selecionei para uma 
                // edição ou remoção
                router.route("/");
                res.render("pages/actionPage", { title: "Item deletado 🗑" });
            }
        );
    });

module.exports = router;
