let imagens = [];
let currentIndex = 0;

// 1. Carrega JSON e encontra o imóvel
async function carregarImovel() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));

    const req = await fetch("./public/imoveis.json");
    const json = await req.json();

    const imovel = json.imoveis.find(x => x.id === id);
    document.getElementById("id-imovel").value = id;
    document.getElementById("mensagem").value =
    `Olá! Vi o anúncio do imóvel #${id} e gostaria de mais informações.`;


    if (!imovel) {
        alert("Imóvel não encontrado!");
        return;
    }

    document.getElementById("titulo").innerText = imovel.tipo;
    document.getElementById("localizacao").innerText =
        `${imovel.bairro}, ${imovel.cidade} - ${imovel.estado}`;
    document.getElementById("descricao").innerText = imovel.descricao;
    document.getElementById("preco").innerText = 
        imovel.preco.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    imagens = imovel.fotos;
    const comodidades = {
    varanda: "Varanda",
    piscina: "Piscina",
    academia: "Academia",
    salao_festas: "Salão de Festas",
    playground: "Playground",
    churrasqueira: "Churrasqueira",
    portaria_24h: "Portaria 24h",
    salao_jogos: "Salão de Jogos",
    bicicletario: "Bicicletário",
    permuta: "Aceita Permuta",
    arCondicionado: "Ar-condicionado",
    elevador: "Elevador"
};

const container = document.getElementById("comodidades-list");
container.innerHTML = "";

Object.keys(comodidades).forEach(campo => {
    if (imovel[campo] === "sim") {
        const item = document.createElement("div");
        item.className = "comodidade-item";
        item.innerHTML = `
            <i class="fa-solid fa-check"></i>
            <span>${comodidades[campo]}</span>
        `;
        container.appendChild(item);
    }
});

    carregarPreview();
}
function carregarPreview() {
    const preview = document.getElementById("galeria-preview");
    preview.innerHTML = "";

    imagens.slice(0, 4).forEach((src, index) => {
        const img = document.createElement("img");
        img.src = src;
        img.onclick = () => openModal(index);
        preview.appendChild(img);
    });
    if (imagens.length > 4) {
        const botao = document.createElement("div");
        botao.className = "ver-mais";
        botao.innerText = `+${imagens.length - 4} ver mais`;
        botao.onclick = () => openModal(0);
        preview.appendChild(botao);
    }
}


function openModal(index) {
    currentIndex = index;
    document.getElementById("modal-img").src = imagens[currentIndex];
    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function nextImg() {
    currentIndex = (currentIndex + 1) % imagens.length;
    document.getElementById("modal-img").src = imagens[currentIndex];
}

function prevImg() {
    currentIndex = (currentIndex - 1 + imagens.length) % imagens.length;
    document.getElementById("modal-img").src = imagens[currentIndex];
}


document.addEventListener("DOMContentLoaded", () => {
    carregarImovel();

    document.getElementById("modalClose").onclick = closeModal;
    document.getElementById("nextBtn").onclick = nextImg;
    document.getElementById("prevBtn").onclick = prevImg;


    document.getElementById("modal").onclick = e => {
        if (e.target.id === "modal") closeModal();
    };
});

carregarImovel();
