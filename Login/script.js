const modal = document.getElementById('modal');
const fechar = document.getElementById('fechar');

function login() {
  var nome = $("#nome").val();
  var senha = $("#senha").val();

  if (nome && senha && nome === "admin" && senha === "admin") {
    const user = {
      name: nome,
      dataEntrada: new Date(),
      id: Math.floor(Math.random() * 100000),
    };

    localStorage.setItem("usuario", JSON.stringify(user));

    window.location.href = "../Loja/loja.html";
  } else {
    modal.style.display = 'block';
  }

  fechar.addEventListener('click', () => {
    modal.style.display = 'none';
  });
}
