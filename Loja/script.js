// Declaração da variável produtos fora do escopo do evento para torná-la global
let produtos;

window.onload = function () {
  var storedUser = localStorage.getItem("usuario");
  var user = JSON.parse(storedUser);
  document.getElementById("user").textContent = user.name;
  document.getElementById("perfil").textContent = user.name;
  document.getElementById("idPerfil").textContent = `Protocolo atual: ${user.id}`;
};

document.addEventListener("DOMContentLoaded", function () {
  fetch("../Dados/loja.json")
    .then((response) => response.json())
    .then((data) => {
      produtos = data;
      const cards =
          document.getElementById("cards");
  
        produtos.map((produto, index) => {
            const cardzinho = document.createElement('div');
            cardzinho.className = 'cardzinho';

            const bolinha = document.createElement('div');
            bolinha.className = 'bolinha';
            if (produto.status == false) {
                bolinha.className = 'bolinha verde';
            }
            else {
                bolinha.className = 'bolinha';
            }

            const nome = document.createElement('h3');
            nome.textContent = `${produto.nome}`;

            const livro = document.createElement('img');
            livro.src = produto.imagem;
            livro.className = 'livro';

            const preco = document.createElement('h4');
            preco.textContent = `Preço: R$${produto.preco.toFixed(2)}`

            const btnAdicionarAoCarrinho = document.createElement("button");
            btnAdicionarAoCarrinho.href = "#";
            btnAdicionarAoCarrinho.className = "botaoCarrinho";
            btnAdicionarAoCarrinho.textContent = "Adicionar ao Carrinho";
            btnAdicionarAoCarrinho.setAttribute("data-indice", index);
            
            cardzinho.appendChild(bolinha);
            cardzinho.appendChild(nome);
            cardzinho.appendChild(livro);
            cardzinho.appendChild(preco);
            cardzinho.appendChild(btnAdicionarAoCarrinho);

            cards.appendChild(cardzinho);
      });
    })
    .catch((error) => console.error("Erro ao carregar o arquivo JSON", error));

  $("#cardzinho").on(
    "click",
    ".btn-adicionar-ao-carrinho",
    function () {
      const indexDoProduto = $(this).data("indice");
      const produtoSelecionado = produtos[indexDoProduto];
      let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
      carrinho.push(produtoSelecionado);
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
    }
  );
});
