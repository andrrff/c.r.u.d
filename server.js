//Configurar o Setup do app

//Chamada de pacotes

var mongoose = require('mongoose');
var express = require('express');
var app = express();
mongoose.Promise = global.Promise;

//Cluster usado

mongoose.connect(
    "mongodb+srv://andrrff:asf17112001@bepbop.gway7.mongodb.net/CRUD",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

const connection = mongoose.connection;

connection.once("open", function () {
    console.log("MongoDB database conexão estabelecida com sucesso!");
});


//Configuracao da varial app para usar o 'bodyParser'

//Definindo a porta onde sera executada nossa aplicacao
var port = process.env.port || 8000;

//Iniciando a aplicacao
app.set("view engine", "ejs");
app.get("/", function (req, res) {
    res.render("pages/index", {title: 'Forms', subtitle: 'Preencha corretamente os campos abaixo'});
});
// app.set("views", "./views");
app.use("/api", require("./app/router/router"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var port = process.env.port || 8000;

app.listen(port);

console.log("Iniciando o app com a porta " + port);