import {server} from "./server.js"

// seleção dos dados conforme o id do HTML
const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event) =>{
  // desabilita o regarregamento da página após o evento
  event.preventDefault()
  content.classList.add("placeholder")

  // .value para recuperar o valor colocado no input
  const videoURL = input.value
  
  // validação da URL
  if(!videoURL.includes("shorts")){
    return content.textContent = "Esse vídeo não parece ser um short..."
  }

  // com o split é feita a separação do texto de acordo com o que for indicado
  // o underline serve para omitir a primeira posição dentro de um array
  const [_, params] = videoURL.split("/shorts/")
  const [videoID] = params.split("?si")
  
  content.textContent = "Obtendo o texto do áudio..."

  const transcription = await server.get("/summary/" + videoID)

  content.textContent = "Realizando o resumo..."

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })

  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})