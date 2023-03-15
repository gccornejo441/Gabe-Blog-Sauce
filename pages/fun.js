import { useState } from 'react'
import figlet from 'figlet'
import { PageSEO } from '@/components/SEO'
import standard from 'figlet/importable-fonts/Standard.js'
import banner from 'figlet/importable-fonts/Banner.js'
import small from 'figlet/importable-fonts/Small.js'
import siteMetadata from '@/data/siteMetadata'
import ansiShadow from 'figlet/importable-fonts/ANSI Shadow.js'

const availableFonts = [
  { name: 'Standard', font: standard },
  { name: 'Big', font: banner },
  { name: 'Small', font: small },
  { name: 'ANSI Shadow', font: ansiShadow },
  // Add more fonts here
]

function AsciiArt() {
  const [name, setName] = useState('')
  const [font, setFont] = useState('Standard')
  const [asciiArt, setAsciiArt] = useState('')
  const [horizontalLayout, setHorizontalLayout] = useState('default')

  const handleNameChange = (event) => {
    setName(event.target.value.slice(0, 50)) // set the max limit to 50 characters
  }

  const handleFontChange = (event) => {
    setFont(event.target.value)
  }

  const handleHorizontalLayoutChange = (event) => {
    setHorizontalLayout(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    figlet.parseFont(font, availableFonts.find((f) => f.name === font).font)
    figlet.text(
      name,
      {
        font: font,
        horizontalLayout: horizontalLayout,
        width: 80,
        whitespaceBreak: true,
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
        <div className="mb-4 rounded-lg bg-forestGreen600 px-8 pt-6 pb-8 text-gray-100 shadow-lg dark:bg-desertSand dark:text-gray-900">
          <h2 className="mb-4 text-xl font-bold dark:divide-gray-700">ASCII Art Generator</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="mb-2 block font-bold text-sageGreen dark:text-forestGreen600">
                Make some art:
              </label>
              <textarea
                required
                className="focus:shadow-outline w-full resize-none appearance-none rounded border py-2 px-3 leading-tight text-sageGreen shadow focus:outline-none dark:text-forestGreen600"
                type="text"
                value={name}
                onChange={handleNameChange}
                maxLength="50"
                rows="1"
              />
              <span className="text-sm text-gray-500 text-sageGreen dark:text-forestGreen600">
                {name.length}/50
              </span>
            </div>
            <div className="mb-4">
              <label className="mb-2 block font-bold text-sageGreen dark:text-forestGreen600">
                Select font:
              </label>
              <select
                className="focus:shadow-outline min-w-full appearance-none rounded border py-2 px-3 leading-tight text-sageGreen shadow focus:outline-none dark:text-forestGreen600"
                value={font}
                onChange={handleFontChange}
              >
                {availableFonts.map((f) => (
                  <option key={f.name} value={f.name}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="mb-2 block font-bold text-sageGreen dark:text-forestGreen600">
                Horizontal Layout:
              </label>
              <select
                className="focus:shadow-outline min-w-full appearance-none rounded border py-2 px-3 leading-tight text-sageGreen shadow focus:outline-none dark:text-forestGreen600"
                value={horizontalLayout}
                onChange={handleHorizontalLayoutChange}
              >
                <option value="default">Default</option>
                <option value="full">Full</option>
                <option value="fitted">Fitted</option>
                <option value="controlled smushing">Controlled Smushing</option>
                <option value="universal smushing">Universal Smushing</option>
              </select>
            </div>
            <button
              type="submit"
              className="inline-block rounded-lg bg-desertSand px-4 py-3 font-medium text-forestGreen600 hover:bg-sageGreen hover:text-forestGreen600 dark:bg-forestGreen600 dark:text-desertSand"
            >
              Generate
            </button>
          </form>
          {asciiArt && <pre className="mt-6 overflow-x-auto whitespace-pre-wrap">{asciiArt}</pre>}
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
