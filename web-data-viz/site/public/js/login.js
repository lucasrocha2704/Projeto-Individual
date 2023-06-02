function validar() {
    var email = ipt_email.value;
    var senha = ipt_senha.value;
    var erro = false;

    if (email.indexOf('@') == -1 || email.indexOf('.') == -1) {
        erro = true;
        ipt_email.style = "border-color: red;";
        msg_email.innerHTML = "Email precisa de @ e .";
    } else {
        ipt_email.style = "border-color: transparent;";
        msg_email.innerHTML = "";
    }

    if (senha.length < 8) {
        erro = true;
        ipt_senha.style = "border-color: red;";
        msg_senha.innerHTML = "senha tem que ter + de 8 Caracteres";
    } else {
        ipt_senha.style = "border-color: transparent;";
        msg_senha.innerHTML = "";
    }

    if (erro == false) {

    }
}