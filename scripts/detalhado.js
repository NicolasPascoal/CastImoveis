let imagens = [];
let currentIndex = 0;

// 1. Carrega JSON e encontra o imóvel
async function carregarImovel() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));

    const req = await fetch("./public/imoveis.json");
    const json = await req.json();

    const imovel = json.imoveis.find(x => x.id === id);

    if (!imovel) {
        alert("Imóvel não encontrado!");
        return;
    }

    // Preenche informações textuais
    document.getElementById("titulo").innerText = imovel.tipo;
    document.getElementById("localizacao").innerText =
        `${imovel.bairro}, ${imovel.cidade} - ${imovel.estado}`;
    document.getElementById("descricao").innerText = imovel.descricao;
    document.getElementById("preco").innerText = 
        imovel.preco.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

    // Define imagens
    imagens = imovel.fotos;

    carregarPreview();
}

// 2. Monta preview com limite 4 imagens
function carregarPreview() {
    const preview = document.getElementById("galeria-preview");
    preview.innerHTML = "";

    imagens.slice(0, 4).forEach((src, index) => {
        const img = document.createElement("img");
        img.src = src;
        img.onclick = () => openModal(index);
        preview.appendChild(img);
    });

    // Se tiver mais de 4, cria botão de "ver mais"
    if (imagens.length > 4) {
        const botao = document.createElement("div");
        botao.className = "ver-mais";
        botao.innerText = `+${imagens.length - 4} ver mais`;
        botao.onclick = () => openModal(0);
        preview.appendChild(botao);
    }
}

// 3. Modal
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

// EVENTOS (🔥 isso faz o X funcionar!)
document.addEventListener("DOMContentLoaded", () => {
    carregarImovel();

    document.getElementById("modalClose").onclick = closeModal;
    document.getElementById("nextBtn").onclick = nextImg;
    document.getElementById("prevBtn").onclick = prevImg;

    // Fechar clicando fora da imagem
    document.getElementById("modal").onclick = e => {
        if (e.target.id === "modal") closeModal();
    };
});

carregarImovel();
