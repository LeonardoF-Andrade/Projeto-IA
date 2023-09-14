import fs from "fs"
import wav from "node-wav"
import ffmpegStatic from "ffmpeg-static"
import ffmpeg from "fluent-ffmpeg"
import { resolve } from "path"
import { rejects } from "assert"
import { error } from "console"

const filePath = "./tmp/audio.mp4"
const outputPath = filePath.replace(".mp4", ".wav")

export const convert = () =>
  new Promise((resolve, reject) => {
    console.log("Convertendo")

    ffmpeg.setFfmpegPath(ffmpegStatic)
    ffmpeg()
      .input(filePath)
      .audioFrequency(16000)
      .audioChannels(1)
      .format("wav")
      .on("end", () => {
        const file = fs.readFileSync(outputPath)
        const fileDecoded = wav.decode(file) //pra transforma o audio para codigo
        const audioData = fileDecoded.channelData[0] //Para pegar o audio
        const floatArray = new Float32Array(audioData)

        resolve(floatArray)
        fs.unlinkSync(outputPath)
      })
      .on("error", (erro) => {
        reject(error)
      })
      .save(outputPath)
  })
