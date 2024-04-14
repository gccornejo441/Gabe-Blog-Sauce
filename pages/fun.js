import { useState } from 'react'
import figlet from 'figlet'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

function AsciiArt() {
  const [name, setName] = useState('')
  const [font, setFont] = useState('Standard')
  const [asciiArt, setAsciiArt] = useState('')
  const [horizontalLayout, setHorizontalLayout] = useState('default')

  figlet.defaults({
    fontPath: '/fonts',
  })

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
    figlet(
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
              <span className="text-sm text-sageGreen dark:text-forestGreen600">
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
                <option value="3D Diagonal">3D Diagonal</option>
                <option value="Dancing Font">Dancing Font</option>
                <option value="Ghost">Ghost</option>
                <option value="Graffiti">Graffiti</option>
                <option value="Patorjk's Cheese">Patorjk's Cheese</option>
                <option value="Standard" defaultValue>
                  Standard
                </option>
                <option value="Pagga">Pagga</option>
                <option value="Pawp">Pawp</option>
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
