const modal = document.getElementById('modal');
const fechar = document.getElementById('fechar');
const fechar2 = document.getElementById('fechar2');
const abrirModal = document.getElementById('addCarrinho');
const confirmarModal = document.getElementById("confirmAdd")

abrirModal.addEventListener('click', () => {
  modal.style.display = `block`;
});

fechar.addEventListener('click', () => {
  modal.style.display = 'none';
})

fechar2.addEventListener('click', () => {
  modal.style.display = 'none';
})

confirmarModal.addEventListener("click", () => {
  addCarrinho(Number(modal.getAttribute("data-index")));
  modal.style.display = 'none';
})


// Declaração da variável produtos fora do escopo do evento para torná-la global
let produtos;

window.onload = function () {
  var storedUser = localStorage.getItem("usuario");
  var user = JSON.parse(storedUser);
  document.getElementById("user").textContent = user.name;
  document.getElementById("perfil").textContent = user.name;
  document.getElementById("idPerfil").textContent = user.id;
};

document.addEventListener("DOMContentLoaded", function () {
  fetch("../Dados/loja.json")
    .then((response) => response.json())
    .then((data) => {
      produtos = data;
      const produtosContainer = document.getElementById("produtos-container");

      produtos.forEach((produto, index) => {
        const card = document.createElement("div");
        card.className = "custom-card";

        const imagem = document.createElement("img");
        imagem.src = produto.imagem;
        imagem.className = "custom-card-img";

        const cardBody = document.createElement("div");
        cardBody.className = "custom-card-body";

        const cardTitle = document.createElement("h5");
        cardTitle.className = "custom-card-title";
        cardTitle.textContent = produto.descricao;

        const cardText = document.createElement("p");
        cardText.className = "custom-card-text";
        cardText.textContent = "Preço: $" + produto.preco.toFixed(2);

        const btnAdicionarAoCarrinho = document.createElement("a");
        btnAdicionarAoCarrinho.href = "#";
        btnAdicionarAoCarrinho.className = "custom-btn-add";
        btnAdicionarAoCarrinho.textContent = "Adicionar ao Carrinho";
        btnAdicionarAoCarrinho.setAttribute("data", index);

        btnAdicionarAoCarrinho.addEventListener("click", (element) => {
          modal.style.display = 'block';

          modal.setAttribute("data-index", element.target.getAttribute("data"));
        });

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(btnAdicionarAoCarrinho);

        card.appendChild(imagem);
        card.appendChild(cardBody);

        produtosContainer.appendChild(card);
      });
    })
    .catch((error) => console.error("Erro ao carregar o arquivo JSON", error));

});

function addCarrinho(index) {
  const produtoSelecionado = produtos[index];
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.push(produtoSelecionado);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}
