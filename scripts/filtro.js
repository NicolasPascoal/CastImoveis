document.querySelector('.search-form').addEventListener('submit', async (e) => {
  e.preventDefault(); 

  const localidade = document.getElementById('Localidade').value;
  const finalidade = document.getElementById('finalidade').value;
  const tipo = document.getElementById('tipo').value;
  const faixaPreco = document.getElementById('preco').value;
  const bairro = document.getElementById('bairro').value;

  let filtros = {};

  if (localidade === 'pg') filtros.cidade = 'Praia Grande';
  else if (localidade === 'snts') filtros.cidade = 'Santos';
  else if (localidade === 'sv') filtros.cidade = 'São Vicente';
  else if (localidade === 'baxd') filtros.estado = 'SP';

  if (finalidade === 'compra') filtros.finalidade = 'Venda';
  else if (finalidade === 'aluguel') filtros.finalidade = 'Aluguel';

  if (tipo !== 'tds') {
    filtros.tipo = tipo === 'apto' ? 'Apartamento' : tipo.charAt(0).toUpperCase() + tipo.slice(1);
  }

  if (faixaPreco === 'ateTrezen') filtros.precoMax = 300000;
  else if (faixaPreco === 'ateOitocen') {
    filtros.precoMin = 300000;
    filtros.precoMax = 800000;
  } else if (faixaPreco === 'acimaOitocen') filtros.precoMin = 800000;

  if (bairro) filtros.bairro = bairro;





  const imoveisFiltrados = await carregarImoveis(filtros);

  console.log('Resultado final:', imoveisFiltrados);
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
