document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("buscarEmprestimo");
    const linhas = document.querySelectorAll(".data-table tbody tr");
  
    if (!input) return;
  
    input.addEventListener("input", () => {
      const texto = input.value.toLowerCase().trim();
  
      linhas.forEach(linha => {
        const livro = linha.children[1].textContent.toLowerCase();
        const usuario = linha.children[2].textContent.toLowerCase();
        const status = linha.children[5].textContent.toLowerCase();
        const id = linha.children[0].textContent.toLowerCase();
  
        linha.style.display =
          livro.includes(texto) ||
          usuario.includes(texto) ||
          status.includes(texto) ||
          id.includes(texto)
            ? ""
            : "none";
      });
    });
  });