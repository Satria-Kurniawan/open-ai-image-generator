const express = require("express")
const router = express.Router()
const { generateImages } = require("../controllers/openAIControllers")

router.post("/generateimages", generateImages)

module.exports = router
