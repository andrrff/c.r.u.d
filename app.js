const mongoose = require('mongoose');
const methodOverride = require("method-override");
const express = require('express');
const bunyan = require("bunyan");
const app = express();
var log = bunyan.createLogger({ name: "crud" });
log.info('start')


//Cluster usado
mongoose.connect(
    "mongodb+srv://andrrff:asf17112001@bepbop.gway7.mongodb.net/CRUD",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

// Verificando se há conexão com sucesso ao banco de dados
const connection = mongoose.connection;

connection.once("open", function () {
    log.info("MongoDB database conexão estabelecida com sucesso!");
});

//Iniciando a aplicacao
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("views", "./app/views");
app.set("view engine", "ejs");
app.use(express.static("app/public"));
app.use(methodOverride("_method"));
app.use("/", require("./app/controller/home"));
app.use("/doc", require("./app/controller/doc"));
app.use("/data", require("./app/controller/data"));
app.use("/api", require("./app/controller/api"));
app.use("/", require("./app/controller/deleteUser"));
app.use("/", require("./app/controller/updateUser"));

//Definindo a porta onde sera executada nossa aplicacao no caso `localhost`
var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
var server_host = process.env.YOUR_HOST || "0.0.0.0";

app.listen(server_port, server_host, function () {
    log.info("Listening on port %d", server_port);
});