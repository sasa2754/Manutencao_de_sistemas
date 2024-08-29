let produtos;

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
            
            cardzinho.appendChild(bolinha);
            cardzinho.appendChild(nome);
            cardzinho.appendChild(livro);
            cardzinho.appendChild(preco);

            cards.appendChild(cardzinho);
        });
      })
      .catch((error) => console.error("Erro ao carregar o arquivo JSON", error));
  
  });