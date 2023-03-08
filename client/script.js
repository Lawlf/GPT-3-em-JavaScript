import robot from './assets/robot.svg'
import user from './assets/user.svg'

const form = document.querySelector('form')
const chatContainer = document.querySelector('#chat_container')

let loadInterval

function loader(element) {
  element.textContent = ''

  loadInterval = setInterval(() => {
    // Atualize o conteúdo de texto do indicador de carregamento.
    element.textContent += '.'

    // Se o indicador de carregamento chegou a três pontos, reset.
    if (element.textContent === '...') {
      element.textContent = ''
    }
  }, 300)
}

function typeText(element, text) {
  let index = 0

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index)
      index++
    } else {
      clearInterval(interval)
    }
  }, 20)
}

function generateUniqueId() {
  const timestamp = Date.now()
  const randomNumber = Math.random() // Gerar um ID único para cada div de mensagem do bot
  const hexadecimalString = randomNumber.toString(16)

  return `id-${timestamp}-${hexadecimalString}`
}

function chatMessage(isAi, value, uniqueId) {
  const aiClass = isAi ? 'ai' : ''
  return `
      <div class="wrapper ${aiClass}">
          <div class="chat">
              <div class="profile">
                  <img src="${isAi ? robot : user}" alt="${isAi ? 'robot' : 'user'}" />
              </div>
              <div class="message" id="${uniqueId}">${value}</div>
          </div>
      </div>
    `
}

const handleSubmit = async (e) => {
  e.preventDefault()

  const prompt = form.elements.prompt.value

  // Mensagem do Usuário
  chatContainer.innerHTML += chatMessage(false, prompt)

  // Limpar o input do form
  form.reset()

  // Mensagem da AI
  const uniqueId = generateUniqueId()
  chatContainer.innerHTML += chatMessage(true, ' ', uniqueId)

  // Focar rolagem para baixo
  chatContainer.scrollTop = chatContainer.scrollHeight

  // MessageDiv especificando
  const messageDiv = document.getElementById(uniqueId)

  // messageDiv.innerHTML = "..."
  loader(messageDiv)

  const response = await fetch('http://localhost:5000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt
    })
  })

  clearInterval(loadInterval)
  messageDiv.innerHTML = ' '

  if (response.ok) { /// Resposta do servidor e passando para o client
    const data = await response.json()
    const parsedData = data.robot.trim()
    typeText(messageDiv, parsedData)
  } else {
    const err = await response.text()

    messageDiv.innerHTML = 'Alguma coisa deu errado'
    alert(err)
  }
}
function handleKeyDown(e) { // Enter para enviar o texto, Shift Enter para pular próxima linha
  if (e.shiftKey && e.keyCode === 13) {
    const start = this.selectionStart;
    const end = this.selectionEnd;
    const value = this.value;
    this.value = value.substring(0, start) + '\n' + value.substring(end);
    this.selectionStart = this.selectionEnd = start + 1;
    e.preventDefault();
  }
}

form.addEventListener('submit', handleSubmit);
form.addEventListener('keydown', handleKeyDown);
form.addEventListener('keyup', function (e) {
  if (e.keyCode === 13 && !e.shiftKey) {
    handleSubmit(e);
  }
});