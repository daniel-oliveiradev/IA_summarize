// biblioteca para o download do video
import ytdl from 'ytdl-core'
// biblioteca ja presente no NODE 
import fs from 'fs'

export const download = (videoId) => new Promise((resolve, reject) => {
  // formatação da URL 
  const videoURL = "https://www.youtube.com/shorts/" + videoId

  console.log("Realizando o download do video:" + videoId)
  
  // definindo os parâmetros do vídeo que será baixado
  ytdl(videoURL, {quality:"lowestaudio", filter: "audioonly"})
  .on("info", (info)=>{
    const seconds = info.formats[0].approxDurationMs/1000
    // validação que o vídeo é um shorts
    if(seconds > 60){
    // lançando("throw") um erro em caso de não ser um shorts
    throw new Error("A duração do vídeo é maior do que 60 segundos. ")
    }
  })
  .on("end", () => {
    console.log("Donwload do vídeo finalizado")
    resolve()
  })
  .on("error", (error)=> {
    console.log("Não foi possível fazer o download do vídeo. Detalhes do erro:", error)
    reject(error)
  })
  
  .pipe(fs.createWriteStream("./tmp/audio.mp4"))
})