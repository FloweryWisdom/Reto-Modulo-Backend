const express = require(`express`)
const userRouter = require(`./routes/user.router`)
const postRouter = require(`./routes/posts.router`)
const authRouter = require(`./routes/auth.router`)


const app = express()

app.use(express.json())

app.use(`/auth`, authRouter)
app.use(`/posts`, postRouter)
app.use(`/user`, userRouter)

app.get(`/`, (request, response) => {
  response.json({
    message: "Reto Modulo Backend"
  })
})

module.exports = app