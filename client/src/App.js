import { useEffect, useState } from "react"
import { TypeAnimation } from "react-type-animation"

function App() {
  const [prompt, setPrompt] = useState("")
  const [size, setSize] = useState("small")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [images, setImages] = useState([])
  const [floatingUpButton, setFloatingUpButton] = useState(false)

  const generateImages = async (event) => {
    event.preventDefault()

    try {
      setLoading(true)
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/openai/generateimages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt, size }),
        }
      )
      const data = await response.json()
      setImages(data.data)
    } catch (error) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    document.addEventListener("scroll", () => {
      window.scrollY > 10
        ? setFloatingUpButton(true)
        : setFloatingUpButton(false)
    })
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0 })
  }

  return (
    <div className="container min-h-screen flex justify-center items-center px-10 py-10 mx-auto">
      <div className="w-full text-center text-white">
        <div className="text-4xl font-bold mb-3">
          <span>OpenAI </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-500 to-indigo-400 md:block inline-block md:text-4xl text-3xl">
            Images Generator
          </span>
        </div>
        <div className="text-lg inline-flex gap-x-1 mb-2 text-gray-300">
          Masukan
          <TypeAnimation
            sequence={[
              "text yang akan digenerate...", // Types 'One'
              1000, // Waits 1s
              "ukuran gambar...", // Deletes 'One' and types 'Two'
              2000, // Waits 2s
            ]}
            wrapper="div"
            cursor={true}
            repeat={Infinity}
          />
        </div>
        <p className="text-gray-300">&#169; Satria Jr</p>
        <form
          onSubmit={generateImages}
          className="w-full max-w-xl mx-auto my-5"
        >
          <div className="mb-7">
            <input
              type="text"
              placeholder="Ketik apa aja bebas..."
              className="w-full rounded-xl bg-transparent py-2 px-3 border border-purple-500 shadow-md shadow-purple-500 text-center text-white focus:outline-purple-500 hover:scale-110 duration-500"
              onChange={(e) =>
                setPrompt((current) => (current = e.target.value))
              }
              value={prompt}
              required
            />
            {error && (
              <span className="text-red-500">
                Ada error boss. Coba diulang!
              </span>
            )}
            <div className="text-sm font-semibold flex justify-center gap-x-3 mt-5">
              <button
                onClick={() => setSize((current) => (current = "small"))}
                className={`${
                  size === "small" &&
                  "bg-gradient-to-r from-purple-200 via-purple-500 to-indigo-400"
                } hover:scale-110 duration-300 py-0.5 px-2 border border-purple-500 rounded-lg`}
              >
                Small
              </button>
              <button
                onClick={() => setSize((current) => (current = "medium"))}
                className={`${
                  size === "medium" &&
                  "bg-gradient-to-r from-purple-200 via-purple-500 to-indigo-400"
                } hover:scale-110 duration-300 py-0.5 px-2 border border-purple-500 rounded-lg`}
              >
                Medium
              </button>
              <button
                onClick={() => setSize((current) => (current = "large"))}
                className={`${
                  size === "large" &&
                  "bg-gradient-to-r from-purple-200 via-purple-500 to-indigo-400"
                } hover:scale-110 duration-300 py-0.5 px-2 border border-purple-500 rounded-lg`}
              >
                Large
              </button>
            </div>
          </div>
          {loading ? (
            <img src="/loading.svg" className="w-16 h-16 mx-auto" />
          ) : (
            <button
              type="submit"
              className="relative items-center justify-center inline-block p-4 px-7 py-3 overflow-hidden font-medium text-indigo-600 rounded-xl shadow-2xl hover:scale-110 group duration-500"
            >
              <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-purple-500 rounded-full blur-md ease"></span>
              <span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
                <span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-300 rounded-full blur-md"></span>
                <span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-indigo-400 rounded-full blur-md"></span>
              </span>
              <span className="relative text-white">Generate</span>
            </button>
          )}
        </form>

        {images.length > 0 && <h1 className="font-semibold mb-5">Hasil</h1>}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-3">
          {images.map((image, i) => (
            <div key={i} className="w-full rounded-xl overflow-hidden">
              <img
                src={image.url}
                className="w-full rounded-xl object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {floatingUpButton && (
        <button
          onClick={scrollToTop}
          className="z-10 fixed bottom-5 right-5 rounded-xl p-3 baseColor text-white shadow-md shadow-purple-500 text-2xl font-bold hover:brightness-90 cursor-pointer duration-300"
        >
          &#8593;
          <h1>UP</h1>
        </button>
      )}
    </div>
  )
}

export default App
