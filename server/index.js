import cors from 'cors'
import express from 'express'

import { convert } from "./convert.js"
import { download } from './download.js'
import { transcribe } from './transcribe.js'
import { summarize } from './summarize.js'

// inicialização do express pela constante "app"
const app = express()

app.use(express.json())
// conexao do front-end com o back-end
app.use(cors())

// criando a rota
app.get("/summary/:id", async (request, response) =>{
  try{
  await download(request.params.id)
  const audioConverted = await convert()
  const result = await transcribe(audioConverted)

  return response.json({result})
  }catch(error){
    return response.json({ error })
  }
})

app.post("/summary", async (request, response) => {
  try{
  const result = await summarize(request.body.text)
  return response.json({result})
  }catch(error){
    return response.json({error})
  }
})

// iniciando o servidor pela porta definida
app.listen(3333, () =>  console.log('Server is running on port 3333')) 