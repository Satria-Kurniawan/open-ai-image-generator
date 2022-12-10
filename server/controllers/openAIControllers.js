const { Configuration, OpenAIApi } = require("openai")
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

const generateImages = async (req, res) => {
  const { prompt, size } = req.body

  const selectedSize =
    size === "small" ? "256x256" : size === "medium" ? "512x512" : "large"

  try {
    const response = await openai.createImage({
      prompt,
      n: 8,
      size: selectedSize,
    })

    res.json(response.data)
  } catch (error) {
    console.log(error)
    res.json({ error })
  }
}

module.exports = { generateImages }
