import express from "express"
import mainRouter from "./routers/index"

const app = express()

app.use(express.json())

app.use(mainRouter)

app.listen(3500, () => console.log("listening on http://localhost:3500"))