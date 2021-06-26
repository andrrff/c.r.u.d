//in progress
class Msg
{
    constructor()
    {
        this.titleError = "Error";
        this.subtitleError = "Infelizmente algo inesperado ocorreu";
        this.saveError = "Erro ao tentar salvar o elemento....:";
        this.elementError =
            " Possiveis causas:\n nickname já exitente;\n nickname muito grande; \nBio muito grande";
        this.titleForms = "Forms";
        this.titleData = "Data";
        this.titleResults = "Results"
        this.edited = "Item editado ✅";
        this.deleted = "Item deletado 🗑";
        this.titleDoc = "Documentação";
        this.subtitleForms = "Preencha corretamente os campos abaixo";
        this.sutitleDoc = "Bem-vindo ao live-demo do meu CRUD 😊";
    }
}

module.exports = Msg;