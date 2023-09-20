const express = require(`express`)
const usersRouter = require(`./routes/users.router`)
const authRouter = require(`./routes/auth.router`)


const app = express()

app.use(express.json())

app.use(`/auth`, authRouter)
app.use(`/users`, usersRouter)

app.get(`/`, (request, response) => {
  response.json({
    message: "Reto Modulo Backend"
  })
})

module.exports = app