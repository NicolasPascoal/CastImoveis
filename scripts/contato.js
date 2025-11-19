
emailjs.init("bzQ27bsIl_ctUZHN0");

document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("form");

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const idImovel = document.getElementById("id-imovel").value;
        const nome = document.getElementById("nome").value.trim();
        const telefone = document.getElementById("telefone").value.trim();
        const email = document.getElementById("email").value.trim();
        const mensagem = document.getElementById("mensagem").value.trim();
        

        if (!nome || !telefone || !email) {
            alert("Por favor, preencha nome, telefone e e-mail.");
            return;
        }
        const templateParams = {
            id_imovel: idImovel,
            nome: nome,
            telefone: telefone,
            email: email,
            mensagem: mensagem
        };
        emailjs.send("service_w5f256d", "template_ewizco5", templateParams)
            .then(() => {
                alert("Mensagem enviada com sucesso!");
                form.reset();
            })
            .catch((error) => {
                console.error("Erro:", error);
                alert("Erro ao enviar. Tente novamente.");
            });
    });

});
