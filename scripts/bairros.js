fetch("./public/bairros.json")
  .then(r => r.json())
  .then(data => {
    const cidadeSelect = document.getElementById("Localidade");
    const bairrosSelect = document.getElementById("bairro");

    cidadeSelect.addEventListener("change", () => {
      const cidade = cidadeSelect.value;

      bairrosSelect.innerHTML = '<option value="">Selecione um bairro</option>';

      if (data[cidade]) {

        // 👉 ordenar alfabeticamente ignorando acentos
        const bairrosOrdenados = [...data[cidade]].sort((a, b) =>
          a.localeCompare(b, "pt-BR", { sensitivity: "base" })
        );

        // preencher o select
        bairrosOrdenados.forEach(b => {
          bairrosSelect.innerHTML += `<option value="${b}">${b}</option>`;
        });
      }
    });
  });
