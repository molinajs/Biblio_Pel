// Modal Functions
function openModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.add("active")
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.remove("active")
  }
}

// Close modal when clicking outside
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal")) {
    event.target.classList.remove("active")
  }
})

// Form submissions (prevent default for demo)
document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("form")
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault()
      alert("Funcionalidade de exemplo! Em produção, isso enviaria os dados para o servidor.")
      // Close modal after submission
      const modal = this.closest(".modal")
      if (modal) {
        modal.classList.remove("active")
      }
    })
  })

  if (typeof window.protectPage === "function") {
    window.protectPage()
  }

  if (typeof window.getCurrentUser === "function") {
    const user = window.getCurrentUser()
    if (user) {
      const userNameElements = document.querySelectorAll(".user-info span")
      userNameElements.forEach((el) => {
        el.textContent = user.name
      })
    }
  }

  const logoutButtons = document.querySelectorAll('a[href="#"]')
  logoutButtons.forEach((btn) => {
    if (btn.textContent.trim() === "Sair") {
      btn.addEventListener("click", (e) => {
        e.preventDefault()
        if (confirm("Deseja realmente sair do sistema?")) {
          if (typeof window.logout === "function") {
            window.logout()
          }
        }
      })
    }
  })
})

// Mobile menu toggle (for responsive)
function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar")
  sidebar.classList.toggle("active")
}
