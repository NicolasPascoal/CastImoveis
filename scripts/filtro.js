document.querySelector('.search-form').addEventListener('submit', async (e) => {
  e.preventDefault(); 

  const localidade = document.getElementById('Localidade').value;
  const finalidade = document.getElementById('finalidade').value;
  const tipo = document.getElementById('tipo').value;
  const faixaPreco = document.getElementById('preco').value;
  const bairro = document.getElementById('bairro').value;
  const quartos = document.getElementById('fa_quartos').value;
  const suites = document.getElementById('fa_suites').value;
  const vagas = document.getElementById('fa_vagas').value;
  const banheiros = document.getElementById('fa_banheiros').value;

  const comodidades = [...document.querySelectorAll('.fa_com:checked')]
                        .map(c => c.value);

  let filtros = {};

  if (localidade === 'pg') filtros.cidade = 'Praia Grande';
  else if (localidade === 'snts') filtros.cidade = 'Santos';
  else if (localidade === 'sv') filtros.cidade = 'São Vicente';
  else if (localidade === 'baxd') filtros.estado = 'SP';

  if (finalidade === 'compra') filtros.finalidade = 'Venda';
  else if (finalidade === 'aluguel') filtros.finalidade = 'Aluguel';

  if (tipo !== 'tds') {
    filtros.tipo = tipo === 'apto'
      ? 'Apartamento'
      : tipo.charAt(0).toUpperCase() + tipo.slice(1);
  }

  if (faixaPreco === 'ateTrezen') filtros.precoMax = 300000;
  else if (faixaPreco === 'ateOitocen') {
    filtros.precoMin = 300000;
    filtros.precoMax = 800000;
  } else if (faixaPreco === 'acimaOitocen') filtros.precoMin = 800000;

  if (bairro) filtros.bairro = bairro;
  if (quartos) filtros.quartos = Number(quartos);
  if (suites) filtros.suites = Number(suites);
  if (vagas) filtros.vagas = Number(vagas);
  if (banheiros) filtros.banheiros = Number(banheiros);
  if (comodidades.length > 0) filtros.comodidades = comodidades;
  const imoveisFiltrados = await carregarImoveis(filtros);

  console.log('🔍 Filtros aplicados:', filtros);
  console.log('📦 Resultado final:', imoveisFiltrados);

  displayImoveis(imoveisFiltrados);
});

async function carregarImoveis(filtros = {}) {
  try {
    const response = await fetch('./public/imoveis.json');
    const data = await response.json();
    let lista = data.imoveis;

    if (filtros.tipo)         lista = lista.filter(i => i.tipo.toLowerCase() === filtros.tipo.toLowerCase());
    if (filtros.cidade)       lista = lista.filter(i => i.cidade.toLowerCase() === filtros.cidade.toLowerCase());
    if (filtros.estado)       lista = lista.filter(i => i.estado.toLowerCase() === filtros.estado.toLowerCase());
    if (filtros.finalidade)   lista = lista.filter(i => i.finalidade.toLowerCase() === filtros.finalidade.toLowerCase());
    if (filtros.precoMax)     lista = lista.filter(i => i.preco <= filtros.precoMax);
    if (filtros.precoMin)     lista = lista.filter(i => i.preco >= filtros.precoMin);
    if (filtros.bairro)       lista = lista.filter(i => i.bairro.toLowerCase() === filtros.bairro.toLowerCase());
    if (filtros.quartos)      lista = lista.filter(i => i.quartos >= filtros.quartos);
    if (filtros.banheiros)    lista = lista.filter(i => i.banheiros >= filtros.banheiros);
    if (filtros.vagas)        lista = lista.filter(i => i.vagas >= filtros.vagas);
    if (filtros.suites)       lista = lista.filter(i => i.suites >= filtros.suites);
    if (filtros.comodidades) {
                              lista = lista.filter(i =>
                              filtros.comodidades.every(c => i[c] === "sim")
                              );
                              }

    return lista;
  } catch (erro) {
    console.error('Erro ao carregar imóveis:', erro);
    return [];
  }
}

fetch('./public/imoveis.json')
  .then(res => res.json())
  .then(imoveis => {
    console.log(imoveis);
  })
  .catch(err => console.error('Erro ao carregar o JSON:', err));
//
 function displayImoveis(lista) {
  const container = document.getElementById('listaImoveis');
  container.innerHTML = "";

  if (!lista.length) {
    container.innerHTML = "<p>Nenhum imóvel encontrado.</p>";
    return;
  }

  lista.forEach(imovel => {

    const primeiraFoto = imovel.fotos?.[0] || "imgs/sem-foto.jpg";
    const card = document.createElement('article');
    card.classList.add('card');

    card.innerHTML = `
      <div class="card-image carousel" data-carousel>
        <div class="carousel-images">
          ${imovel.fotos?.map(f => `
            <img src="${f}" alt="Foto do imóvel">
          `).join('')}
        </div>
        <button class="prev">&#10094;</button>
        <button class="next">&#10095;</button>
      </div>

      <div class="card-body">
        <h3>${imovel.tipo} - ${imovel.bairro}</h3>
        <p class="price">R$ ${imovel.preco.toLocaleString('pt-BR')}</p>

        <p class="meta">
          ${imovel.descricao || ""}
        </p>

        <a class="btn btn-sm" href="#" onclick="verDetalhes(${imovel.id})">
          Ver detalhes
        </a>
      </div>
    `;  

    container.appendChild(card);
  });

  iniciarCarrosseis(); // ativa o carrossel
}
