const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")
const PORT = process.env.PORT || 5001

app.use(cors({ origin: process.env.CLIENT_URL }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/api/openai", require("./routes/openAIRoutes"))

app.listen(PORT, () => console.log("Server running on PORT", PORT))
