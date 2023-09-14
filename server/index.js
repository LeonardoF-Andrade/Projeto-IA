import cors from "cors"
import express from "express"

import { download } from "./download.js"
import { transcribe } from "./transcription.js"
import { summarize } from "./summarize.js"
import { convert } from "./convert.js"

const app = express()
app.use(express.json())
app.use(cors())

app.get("/summary/:id", async (request, response) => {
  const { id } = request.params
  const { type } = request.query
  try {
    if (type === "shorts") {
      await download(id, 0)
      const audioConverted = await convert()
      const result = await transcribe(audioConverted)

      return response.json({ result })
    } else if (type === "video") {
      await download(id, 1)
      const audioConverted = await convert()
      const result = await transcribe(audioConverted)

      return response.json({ result })
    }
  } catch (error) {
    console.log(error)
    return response.json({ error })
  }
})

app.post("/summary", async (request, response) => {
  try {
    const result = await summarize(request.body.text)
    return response.json({ result })
  } catch (error) {
    console.log(error)
    return response.json({ error })
  }
})
app.listen(3333, () => console.log("Server is running on port 3333"))
