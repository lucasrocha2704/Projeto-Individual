function validar() {
    var nome = ipt_nome.value;
    var email = ipt_email.value;
    var senha = ipt_senha.value;
    var confirmarSenha = ipt_confirmar_senha.value;
    var erro = false;

    if (email.indexOf('@') == -1 || email.indexOf('.') == -1) {
        erro = true;
        alert("E-mail invalido")
    }

    if (nome.length  < 4) {
        erro = true;
        alert("Nome tem que ter mais que 4 digitos")
    }

    if (senha.length < 8) {
        erro = true;
        alert("a Senha tem que ter mais de 8 dígitos")
    }

    if (confirmarSenha != senha) {
        erro = true;
        alert("A segunda senha tem que ser igual a primeira")
    }

    if (erro == false) {

    }
}