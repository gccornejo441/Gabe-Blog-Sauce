import { useState } from 'react'
import figlet from 'figlet'
import standard from 'figlet/importable-fonts/Standard.js'

figlet.parseFont('Standard', standard)

function AsciiArt() {
  const [name, setName] = useState('')
  const [asciiArt, setAsciiArt] = useState('')

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    figlet.text(
      name,
      {
        font: 'Standard',
      },
      (err, data) => {
        if (err) {
          console.log('Error:', err)
          return
        }

        setAsciiArt(data)
      }
    )
  }

  return (
    <div className="bg-gray-100 py-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 rounded-lg bg-white px-8 pt-6 pb-8 shadow-lg">
          <h2 className="mb-4 text-xl font-bold">ASCII Art Generator</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="mb-2 block font-bold text-gray-700">Enter your name:</label>
              <input
                className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                type="text"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <button
              type="submit"
              className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
            >
              Generate ASCII art
            </button>
          </form>
          {asciiArt && <pre className="mt-6 overflow-x-auto whitespace-pre-wrap">{asciiArt}</pre>}
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return <AsciiArt />
}
