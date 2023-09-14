import { server } from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event) => {
  const video = input.value

  event.preventDefault()
  content.classList.add("placeholder")

  if (video.includes("shorts")) {
    content.textContent = "É um Shorts"
    const [_, parm] = video.split("/shorts/")
    const [vid] = parm.split("?si")
    input.value = ""
    content.textContent = "O video está sendo processado..."
    const transcrip = await server.get(`/summary/${vid}?type=shorts`)
    content.textContent = "Realizando o resumo..."
      const summary = await server.post("/summary", {
        text: transcrip.data.result,
      })

      content.textContent = summary.data.result
  } else if (video.includes("/watch?v=")) {
    content.textContent = "É um video grande"
    const [_, parm] = video.split("/watch?v=")
    const [vid] = parm.split("?si")
    input.value = ""
    content.textContent = "O video está sendo processado..."
    const transcrip = await server.get(`/summary/${vid}?type=video`)
    content.textContent = "Realizando o resumo..."
      const summary = await server.post("/summary", {
        text: transcrip.data.result,
      })

      content.textContent = summary.data.result
  } else {
    return (content.textContent = "Formato não compativel")
  }
  content.classList.remove("placeholder")
})
