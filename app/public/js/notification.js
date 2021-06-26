class Notification 
{
    constructor(logic)
    {
        if(logic)
        {
            this.message = "Cadastro efeutuado com sucesso 😉!";
            this.tipoAlert = "alert-success";
            this.svg = "#check-circle-fill";
            this.alert = true;
        }
        else
        {
            this.message =
                "Ocorreu um erro no cadastro 😢!\n Possiveis causas:\n nickname já exitente;\n nickname muito grande; \nBio muito grande";
            this.tipoAlert = "alert-danger";
            this.svg = "#exclamation-triangle-fill";
            this.alert = true;
        }
    }
}



module.exports = Notification;