document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("buscarUsuario");
    const linhas = document.querySelectorAll(".data-table tbody tr");
  
    if (!input) return;
  
    input.addEventListener("input", () => {
      const texto = input.value.toLowerCase().trim();
  
      linhas.forEach(linha => {
        const id = linha.children[0].textContent.toLowerCase();
        const nome = linha.children[1].textContent.toLowerCase();
        const email = linha.children[2].textContent.toLowerCase();
        const telefone = linha.children[3].textContent.toLowerCase();
        const status = linha.children[5].textContent.toLowerCase();
  
        linha.style.display =
          id.includes(texto) ||
          nome.includes(texto) ||
          email.includes(texto) ||
          telefone.includes(texto) ||
          status.includes(texto)
            ? ""
            : "none";
      });
    });
  });