// Sistema de autenticação
const AUTH_KEY = "bibliopel_auth"
const USER_KEY = "bibliopel_user"

// Usuário padrão (em produção, isso viria de um banco de dados)
const defaultUsers = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    name: "Administrador",
    role: "admin",
  },
]

// Função de login
function login(username, password) {
  const user = defaultUsers.find((u) => u.username === username && u.password === password)

  if (user) {
    const authData = {
      isAuthenticated: true,
      token: generateToken(),
      loginTime: new Date().toISOString(),
    }

    const userData = {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
    }

    localStorage.setItem(AUTH_KEY, JSON.stringify(authData))
    localStorage.setItem(USER_KEY, JSON.stringify(userData))

    return { success: true, user: userData }
  }

  return { success: false, message: "Usuário ou senha inválidos" }
}

// Função de logout
function logout() {
  localStorage.removeItem(AUTH_KEY)
  localStorage.removeItem(USER_KEY)
  window.location.href = "login.html"
}

// Verificar se está autenticado
function isAuthenticated() {
  const authData = localStorage.getItem(AUTH_KEY)
  if (!authData) return false

  try {
    const auth = JSON.parse(authData)
    return auth.isAuthenticated === true
  } catch {
    return false
  }
}

// Obter usuário atual
function getCurrentUser() {
  const userData = localStorage.getItem(USER_KEY)
  if (!userData) return null

  try {
    return JSON.parse(userData)
  } catch {
    return null
  }
}

// Gerar token simples (em produção usar JWT)
function generateToken() {
  return "token_" + Math.random().toString(36).substr(2, 9) + "_" + Date.now()
}

// Proteger página - chamar em todas as páginas protegidas
function protectPage() {
  if (!isAuthenticated()) {
    window.location.href = "login.html"
  }
}

// Alternar visibilidade da senha
function togglePassword() {
  const passwordInput = document.getElementById("password")
  const toggleBtn = document.querySelector(".toggle-password i")

  if (passwordInput.type === "password") {
    passwordInput.type = "text"
    toggleBtn.classList.remove("fa-eye")
    toggleBtn.classList.add("fa-eye-slash")
  } else {
    passwordInput.type = "password"
    toggleBtn.classList.remove("fa-eye-slash")
    toggleBtn.classList.add("fa-eye")
  }
}

// Mostrar mensagem de erro
function showError(message) {
  const errorDiv = document.getElementById("errorMessage")
  const errorSpan = errorDiv.querySelector("span")
  errorSpan.textContent = message
  errorDiv.style.display = "flex"

  setTimeout(() => {
    errorDiv.style.display = "none"
  }, 5000)
}

window.protectPage = protectPage
window.getCurrentUser = getCurrentUser
window.logout = logout
window.isAuthenticated = isAuthenticated
window.login = login
window.togglePassword = togglePassword
window.showError = showError

// Handler do formulário de login
document.addEventListener("DOMContentLoaded", () => {
  console.log("[v0] Auth.js carregado")

  const loginForm = document.getElementById("loginForm")

  if (loginForm) {
    console.log("[v0] Formulário de login encontrado")

    // Verificar se já está logado
    if (isAuthenticated()) {
      console.log("[v0] Usuário já autenticado, redirecionando...")
      window.location.href = "index.html"
      return
    }
    

    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()
      console.log("[v0] Formulário submetido")

      const username = document.getElementById("username").value
      const password = document.getElementById("password").value

      console.log("[v0] Tentando login com usuário:", username)

      const result = login(username, password)

      if (result.success) {
        console.log("[v0] Login bem-sucedido!")
        // Pequeno delay para garantir que o localStorage foi atualizado
        setTimeout(() => {
          window.location.href = "index.html"
        }, 100)
      } else {
        console.log("[v0] Login falhou:", result.message)
        showError(result.message)
      }
    })
  } else {
    console.log("[v0] Formulário de login NÃO encontrado")
  }
})
