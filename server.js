const mongoose = require('mongoose');
const methodOverride = require("method-override");
const express = require('express');
const app = express();
const ProdutoSchema = require("./app/models/produto");
mongoose.Promise = global.Promise;
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

var router = express.Router();
var padrao = mongoose.model("Produtos", ProdutoSchema);

//Configuracao da varial app para usar o 'bodyParser'

//Definindo a porta onde sera executada nossa aplicacao
var port = process.env.port || 8000;

//Iniciando a aplicacao
app.set("view engine", "ejs");
app.use(express.static("app/public"));
app.use(methodOverride("_method"));


app.get("/", function (req, res) {
    
    res.render("pages/index", {
        title: "Forms",
        subtitle: "Preencha corretamente os campos abaixo",
        notificacao: " ",
        tipoAlert: " ",
        svg: " ",
        alert: false,
    });
    // res.render("template", {
        
    // }); // you forgot a ')' here 
});

app.route('/')
    .post((req, res) => {
        var produto = new padrao();
        var notificacao = String;
        var tipoAlert = String;
        var svg = String;
        var alert = Boolean;
        var block = Boolean;
        var currentdate = new Date();
        var datetime =
            currentdate.getDate() +
            "/" +
            (currentdate.getMonth() + 1) +
            "/" +
            currentdate.getFullYear() +
            " - " +
            currentdate.getHours() +
            ":" +
            currentdate.getMinutes() +
            ":" +
            currentdate.getSeconds();

        //Aqui vamos setar os campos do produto (via request):
        produto.firstname = req.body.firstname;
        produto.lastname = req.body.lastname;
        produto.nickname = req.body.username;
        produto.address = req.body.address;
        produto.bio = req.body.bio;
        produto.dataLancamento = datetime;
        // res.render("../../views/pages/index");
        // res.produtos.forEach((element) => {
        //     if (element.nickname == produto.nickname) {
        //         console.log("Este user name ja exite!!!");
        //     }
        // });
        padrao.find((error, produtos) => {
            if (error)
                res.send(
                    "Erro ao tentar Selecionar Todos os produtos...: " + error
                );

            produtos.forEach((element) => {
                if (element.nickname != produto.nickname) {
                    notificacao = "Cadastro efeutuado com sucesso 😉!";
                    tipoAlert = "alert-success";
                    svg = "#check-circle-fill";
                    alert = true;
                    block = false;
                }
                else
                {
                    notificacao = "Este nickname ja existe 😢!";
                    tipoAlert = "alert-danger";
                    svg = "#exclamation-triangle-fill";
                    alert = true;
                    block = true;
                }
            });
            if(!block)
            {
                produto.save((error) => {
                    if (error)
                        res.send("Erro ao tentar salvar o Produto....: " + error);
    
                    res.render("pages/index", {
                        title: "Forms",
                        subtitle: "Preencha corretamente os campos abaixo",
                        notificacao: notificacao,
                        tipoAlert: tipoAlert,
                        svg: svg,
                        alert: alert,
                    });
                });
            }
            else
            {
                res.render("pages/index", {
                        title: "Forms",
                        subtitle: "Preencha corretamente os campos abaixo",
                        notificacao: notificacao,
                        tipoAlert: tipoAlert,
                        svg: svg,
                        alert: alert,
                    });
            }
        });
    })

// app.get("/login", (req, res) => {
//     res.sendFile(__dirname + "/index.html");
// });

// app.post("/login", (req, res) => {
//     let username = req.body.firstname;
//     let password = req.body.lastname;
//     res.send(`Username: ${username} Password: ${password}`);
// });
// app.set("views", "./views");
app.use("/api", require("./app/router/router"));

app.listen(process.env.port || 8000);

console.log("Iniciando o app com a porta " + port);