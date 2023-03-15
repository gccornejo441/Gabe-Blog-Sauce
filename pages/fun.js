import { useState } from 'react'
import figlet from 'figlet'
import standard from 'figlet/importable-fonts/Standard.js'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

figlet.parseFont('Standard', standard)

function AsciiArt() {
  const [name, setName] = useState('')
  const [asciiArt, setAsciiArt] = useState('')

  const handleNameChange = (event) => {
    setName(event.target.value.slice(0, 50)) // set the max limit to 50 characters
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
    <div className="py-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 rounded-lg bg-white px-8 pt-6 pb-8 shadow-lg">
          <h2 className="mb-4 text-xl font-bold">ASCII Art Generator</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="mb-2 block font-bold text-gray-700">Make some art:</label>
              <textarea
                required
                className="focus:shadow-outline w-full resize-none appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                type="text"
                value={name}
                onChange={handleNameChange}
                maxLength="50"
                rows="1"
              />
              <span className="text-sm text-gray-500">{name.length}/50</span>
            </div>
            <button
              type="submit"
              className="inline-block rounded-lg bg-forestGreen600 px-4 py-3 font-medium text-white hover:bg-desertSand hover:text-forestGreen600"
            >
              Generate
            </button>
          </form>
          {asciiArt && <pre className="mt-6 overflow-x-auto">{asciiArt}</pre>}
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <AsciiArt />
    </>
  )
}
