var express = require("express");
var mongoose = require("mongoose");
const ProdutoSchema = require("../../models/produto");
var router = express.Router();

// // var padrao = mongoose.model("Produtos", ProdutoSchema);

// var chatForm = document.forms.form;
// var firstName = document.querySelector('.first-name');
// var lastName = document.querySelector(".last-name");
// var nickName = document.querySelector(".nickname");
// var adress = document.querySelector(".address");
// var bio = document.querySelector(".bio");
// if (chatForm) {
// chatForm.addEventListener('submit', function(e) {
//     e.preventDefault();
//     router.post(function (req, res) {
//         var produto = new padrao();

//         //Aqui vamos setar os campos do produto (via request):
//         produto.firstname = firstName;
//         produto.lastname = lastName;
//         produto.nickname = nickName;
//         produto.address = adress;
//         produto.bio = bioT;
//         // res.render("../../views/pages/index");

//         produto.save(function (error) {
//             if (error)
//                 res.send("Erro ao tentar salvar o Produto....: " + error);

//             res.json({ message: "Produto Cadastrado com Sucesso!" });
//         });
//     });
//     // socket.emit('postMessage',{
//     // username: chatUsername.value,
//     // message: chatMessage.value,
//     // });
//     // chatMessage.value='';
//     // chatMessage.focus();
// }); //chatform event
// }
// let form = document.getElementById("form").elements;


// form.addEventListener("submit", (event) => {
//     // console.log(name.value);
//     // console.log(lastname.value);
//     // console.log(nickname.value);
//     // console.log(address.value);
//     // console.log(bio.value);
//     window.alert(name);
// });

function common1() {
    console.log("common1() - ✅");
}
function common2(key) {
    console.log("common2() - ✅");
}
module.exports = {
    common1: common1,
    common2: common2,
};