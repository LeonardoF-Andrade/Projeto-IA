import ytdl from "ytdl-core"
import fs from "fs"

export const download = (videoId, a) =>
  new Promise((resolve, reject) => {
    let vi = 0
    if (a == 0) {
      vi = "https://www.youtube.com/shorts/"
    } else {
      vi = "https://www.youtube.com/watch?v="
    }
    const videoURL = vi + videoId
    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
      .on("info", (info) => {
        const segundos = info.formats[0].approxDurationMs / 1000
        console.log(segundos)
      })
      .on("end", () => {
        console.log("Downloado finalizado")
        resolve()
      })
      .on("error", (error) => {
        console.log("Não foi possivel")
        reject(error)
      })
      .pipe(fs.createWriteStream("./tmp/audio.mp4"))
  })
