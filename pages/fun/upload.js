import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import Dropzone from '@/components/DropZone'
import Menu from '@/components/Menu'

export default function Upload() {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <section className="rounded-lg bg-forestGreen50">
        <div className=" mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="p-3 text-left">
            <Dropzone />
          </div>
        </div>
      </section>
    </>
  )
}
