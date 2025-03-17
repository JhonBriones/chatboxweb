document.addEventListener("DOMContentLoaded", () => {
  // Navbar scroll effect
  const navbar = document.querySelector(".navbar")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)"
    } else {
      navbar.style.boxShadow = "none"
    }
  })

  // Chat navigation functionality
  const chatNavItems = document.querySelectorAll(".chat-nav-item")

  chatNavItems.forEach((item) => {
    item.addEventListener("click", function () {
      chatNavItems.forEach((navItem) => {
        navItem.classList.remove("active")
      })
      this.classList.add("active")
    })
  })

  // Message item click functionality
  const messageItems = document.querySelectorAll(".message-item")

  messageItems.forEach((item) => {
    item.addEventListener("click", function () {
      messageItems.forEach((msgItem) => {
        msgItem.style.backgroundColor = ""
      })
      this.style.backgroundColor = "#f0f9ff"
    })
  })

  // Message input functionality
  const messageInput = document.querySelector(".input-field input")
  const sendButton = document.querySelector(".input-action:last-child")

  sendButton.addEventListener("click", sendMessage)
  messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  })

  function sendMessage() {
    const message = messageInput.value.trim()
    if (message) {
      // Create new message element
      const chatMessages = document.querySelector(".chat-messages")

      const messageElement = document.createElement("div")
      messageElement.className = "message sent"
      messageElement.innerHTML = `
                  <div class="message-bubble-container">
                      <div class="message-info">
                          <span class="message-time">${getCurrentTime()}</span>
                          <span class="sender-name">You</span>
                      </div>
                      <div class="message-bubble">
                          <p>${message}</p>
                      </div>
                  </div>
                  <div class="avatar">
                      <img src="https://via.placeholder.com/32" alt="You">
                  </div>
              `

      chatMessages.appendChild(messageElement)
      chatMessages.scrollTop = chatMessages.scrollHeight
      messageInput.value = ""
    }
  }

  function getCurrentTime() {
    const now = new Date()
    let hours = now.getHours()
    const minutes = now.getMinutes().toString().padStart(2, "0")
    const ampm = hours >= 12 ? "PM" : "AM"

    hours = hours % 12
    hours = hours ? hours : 12 // the hour '0' should be '12'

    return `${hours}:${minutes} ${ampm}`
  }

  // Animation on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".feature-card, .stat-item, .communicate-text, .rt-text")

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementTop < windowHeight * 0.8) {
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      }
    })
  }

  // Initial styles for animation
  document.querySelectorAll(".feature-card, .stat-item, .communicate-text, .rt-text").forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"
    element.style.transition = "all 0.6s ease"
  })

  // Run animation on scroll
  window.addEventListener("scroll", animateOnScroll)
  animateOnScroll() // Run once on load

  // Añadir funcionalidad para ajustar la altura del chat en dispositivos móviles
  function adjustChatHeight() {
    const chatContainer = document.querySelector(".chat-container")
    if (window.innerWidth <= 768) {
      // En móviles, ajustar la altura automáticamente
      chatContainer.style.height = "auto"

      // Asegurarse de que los contenedores internos no excedan cierta altura
      const sidebar = document.querySelector(".sidebar")
      const messageList = document.querySelector(".message-list")

      if (sidebar && messageList) {
        sidebar.style.maxHeight = "250px"
        messageList.style.maxHeight = "250px"
      }
    } else {
      // En pantallas más grandes, restaurar la altura original
      if (window.innerWidth <= 992) {
        chatContainer.style.height = "550px"
      } else if (window.innerWidth <= 1200) {
        chatContainer.style.height = "600px"
      } else {
        chatContainer.style.height = "800px"
      }

      // Restaurar alturas de contenedores internos
      const sidebar = document.querySelector(".sidebar")
      const messageList = document.querySelector(".message-list")

      if (sidebar && messageList) {
        sidebar.style.maxHeight = ""
        messageList.style.maxHeight = ""
      }
    }
  }

  // Ejecutar al cargar y al cambiar el tamaño de la ventana
  adjustChatHeight()
  window.addEventListener("resize", adjustChatHeight)

  // Optimizar imágenes para carga en móviles
  function optimizeImages() {
    const images = document.querySelectorAll("img")
    images.forEach((img) => {
      // Asegurarse de que las imágenes no desborden sus contenedores
      img.style.maxWidth = "100%"
      img.style.height = "auto"
    })
  }

  optimizeImages()
})

// Add the language switching functionality at the end of the file

// Language switching functionality
const langButtons = document.querySelectorAll(".lang-btn")
let currentLang = localStorage.getItem("chatbox-lang") || "es"

// Function to update all text elements with translations
function updateLanguage(lang) {
  // Update active button
  langButtons.forEach((btn) => {
    if (btn.dataset.lang === lang) {
      btn.classList.add("active")
    } else {
      btn.classList.remove("active")
    }
  })

  // Save language preference
  localStorage.setItem("chatbox-lang", lang)
  currentLang = lang

  // Update navbar
  document.querySelectorAll(".nav-links a")[0].textContent = translations[lang].home
  document.querySelectorAll(".nav-links a")[1].textContent = translations[lang].features
  document.querySelectorAll(".nav-links a")[2].textContent = translations[lang].aboutUs
  document.querySelectorAll(".nav-links a")[3].textContent = translations[lang].download
  document.querySelector(".try-free-btn").textContent = translations[lang].tryForFree

  // Update hero section
  document.querySelector(".hero-text h1").innerHTML = translations[lang].heroTitle
  document.querySelector(".hero-text p").innerHTML = translations[lang].heroSubtitle
  document.querySelectorAll(".download-btn")[0].innerHTML =
    `<i class="fab fa-apple"></i> ${translations[lang].downloadNow}`
  document.querySelectorAll(".download-btn")[1].innerHTML =
    `<i class="fas fa-arrow-down"></i> ${translations[lang].downloadNow}`

  // Update features section
  document.querySelector(".button-feature").textContent = translations[lang].featured
  document.querySelector(".section-header h2").innerHTML = translations[lang].reasonsTitle
  document.querySelector(".section-header p").innerHTML = translations[lang].reasonsSubtitle
  document.querySelectorAll(".feature-card-blue h3")[0].textContent = translations[lang].easyToUse
  document.querySelectorAll(".feature-card-blue p")[0].innerHTML = translations[lang].easyToUseDesc
  document.querySelectorAll(".feature-card h3")[0].textContent = translations[lang].realTime
  document.querySelectorAll(".feature-card p")[0].innerHTML = translations[lang].realTimeDesc
  document.querySelectorAll(".feature-card h3")[1].textContent = translations[lang].safetyPrivate
  document.querySelectorAll(".feature-card p")[1].innerHTML = translations[lang].safetyPrivateDesc

  // Update communicate section
  document.querySelector(".communicate-text h2").innerHTML = translations[lang].communicateTitle
  document.querySelector(".communicate-text p").textContent = translations[lang].communicateDesc
  document.querySelectorAll(".stat-item p")[0].textContent = translations[lang].users
  document.querySelectorAll(".stat-item p")[1].textContent = translations[lang].downloads
  document.querySelectorAll(".stat-item p")[2].textContent = translations[lang].years

  // Update real time section
  document.querySelector(".rt-text h2").innerHTML = translations[lang].rtTitle
  document.querySelector(".rt-text p").textContent = translations[lang].rtDesc
  document.querySelector(".learn-more-btn").textContent = translations[lang].learnMore

  // Update CTA section
  document.querySelector(".cta-text h2").textContent = translations[lang].stayConnected
  document.querySelectorAll(".download-btn1")[0].innerHTML =
    `<i class="fab fa-apple"></i> ${translations[lang].downloadNow}`
  document.querySelectorAll(".download-btn2")[0].innerHTML =
    `<i class="fas fa-arrow-down"></i> ${translations[lang].downloadNow}`

  // Update footer
  document.querySelectorAll(".link-group h4")[0].textContent = translations[lang].home
  document.querySelectorAll(".link-group a")[0].textContent = translations[lang].aboutUsFooter
  document.querySelectorAll(".link-group a")[1].textContent = translations[lang].featuresFooter
  document.querySelectorAll(".link-group a")[2].textContent = translations[lang].downloadFooter

  document.querySelectorAll(".link-group h4")[1].textContent = translations[lang].featuresFooter
  document.querySelectorAll(".link-group a")[3].textContent = translations[lang].realTimeFooter
  document.querySelectorAll(".link-group a")[4].textContent = translations[lang].safetyFooter
  document.querySelectorAll(".link-group a")[5].textContent = translations[lang].easyToUseFooter
  document.querySelectorAll(".link-group a")[6].textContent = translations[lang].privacyPolicy

  document.querySelectorAll(".link-group h4")[2].textContent = translations[lang].socialMedia

  document.querySelector(".footer-bottom p").textContent = translations[lang].allRights
}

// Add event listeners to language buttons
langButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    const lang = this.dataset.lang
    updateLanguage(lang)
  })
})

// Initialize with saved language or default
document.addEventListener("DOMContentLoaded", () => {
  // Load the translations script
  const script = document.createElement("script")
  script.src = "translations.js"
  script.onload = () => {
    //translations variable is declared in translations.js
    if (typeof translations !== "undefined") {
      updateLanguage(currentLang)
    } else {
      console.error('translations.js failed to load or does not declare the "translations" variable.')
    }
  }
  script.onerror = () => {
    console.error("Failed to load translations.js")
  }
  document.head.appendChild(script)

  // Rest of the DOMContentLoaded code...
})

