const mongoose = require('mongoose');
const methodOverride = require("method-override");
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//Cluster usado
mongoose.connect(
    "mongodb+srv://andrrff:asf17112001@bepbop.gway7.mongodb.net/CRUD",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

const connection = mongoose.connection;

connection.once("open", function () {
    console.log("MongoDB database conexão estabelecida com sucesso!");
});

//Iniciando a aplicacao
app.set("views", "./app/views");
app.set("view engine", "ejs");
app.use(express.static("app/public"));
app.use(methodOverride("_method"));
app.use("/", require("./app/controller/home"));
app.use("/data", require("./app/controller/data"));
app.use("/", require("./app/controller/deleteUser"));
app.use("/", require("./app/controller/updateUser"));

//Definindo a porta onde sera executada nossa aplicacao no caso `localhost`
var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
var server_host = process.env.YOUR_HOST || "0.0.0.0";
app.listen(server_port, server_host, function () {
    console.log("Listening on port %d", server_port);
});