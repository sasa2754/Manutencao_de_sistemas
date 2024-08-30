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

      produtos.map((produto, index) => {
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
        btnAdicionarAoCarrinho.setAttribute("data-indice", index);

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(btnAdicionarAoCarrinho);

        card.appendChild(imagem);
        card.appendChild(cardBody);

        produtosContainer.appendChild(card);
      });
    })
    .catch((error) => console.error("Erro ao carregar o arquivo JSON", error));

  $("#produtos-container").on("click", ".custom-btn-add", function () {
    const indexDoProduto = $(this).data("indice");
    const produtoSelecionado = produtos[indexDoProduto];
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.push(produtoSelecionado);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  });
});
