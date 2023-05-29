function validar() {
    var email = ipt_email.value;
    var senha = ipt_senha.value;
    var erro = false;

    if (email.indexOf('@') == -1 || email.indexOf('.') == -1) {
        erro = true;
        alert("E-mail invalido")
    }

    if (senha.length < 8) {
        erro = true;
        alert("a Senha tem que ter mais de 8 dígitos")
    }

    if (erro == false) {

    }
}