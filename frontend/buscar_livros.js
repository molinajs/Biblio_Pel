document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("buscarLivro");
    const tabela = document.querySelector(".data-table tbody");
  
    if (!input || !tabela) {
      console.error("Input ou tabela não encontrados");
      return;
    }
  
    input.addEventListener("input", () => {
      const texto = input.value.toLowerCase();
  
      Array.from(tabela.rows).forEach(linha => {
        const conteudo = linha.textContent.toLowerCase();
        linha.style.display = conteudo.includes(texto) ? "" : "none";
      });
    });
  });