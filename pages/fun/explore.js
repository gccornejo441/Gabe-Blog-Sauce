import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { CldImage } from 'next-cloudinary'
import ImageCard from '@/components/insta-explore/ImageCard'
import cloudinary from '@/lib/utils/CloudinaryConfiguration'
import getBase64ImageUrl from '@/lib/utils/generateBlurPlaceholder'
import { Masonry } from 'react-plock'
import { Fragment } from 'react/cjs/react.production.min'

export default function Explore({ images }) {
  const [data, setData] = useState(images)
  const [user, loading, error] = useAuthState(auth)
  const router = useRouter()
  const items = [...data]

  useEffect(() => {
    if (!(user || loading)) {
      router.push('/account/login')
    }
  }, [user, loading, router])

  // Server-render loading state
  if (!user || user.isLoggedIn === false) {
    return <p>Loading...</p>
  }

  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <section className="rounded-lg bg-forestGreen50">
        <div className=" mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="p-3 text-left">
            <Masonry
              items={items}
              config={{
                columns: [1, 2, 3],
                gap: [24, 12, 6],
                media: [640, 768, 1024],
              }}
              render={({ id, public_id, blurDataUrl, width, height }, index) => {
                return (
                  <Fragment key={id}>
                    {index === 0}
                    {/* <CldImage
                      alt="Willian Justen photo"
                      className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                      style={{ transform: 'translate3d(0, 0, 0)' }}
                      placeholder="blur"
                      blurDataURL={blurDataUrl}
                      src={public_id}
                      width={width > height ? 1280 : 853}
                      height={height > width ? 1280 : 853}
                      format="webp"
                      loading="lazy"
                      sizes="(max-width: 648px) 100vw, 25vw"
                    /> */}

                    <ImageCard
                      key={id}
                      id={id}
                      public_id={public_id}
                      blurDataUrl={blurDataUrl}
                      width={width}
                      height={height}
                    />
                  </Fragment>
                )
              }}
            />
          </div>
        </div>
      </section>
    </>
  )
}

export async function getStaticProps() {
  const results = await cloudinary.v2.search.sort_by('folder', 'asc').max_results(2000).execute()

  if (results?.next_cursor) {
    const moreResults = await cloudinary.v2.search
      .sort_by('folder', 'asc')
      .next_cursor(results?.next_cursor)
      .max_results(2000)
      .execute()

    results.resources = results.resources.concat(moreResults.resources)
  }

  let reducedResults = []
  let folders = []

  let i = 0
  for (let result of results?.resources) {
    reducedResults.push({
      id: i,
      folder: result.folder,
      height: result.height,
      width: result.width,
      aspect_ratio: result.aspect_ratio,
      public_id: result.public_id,
      format: result.format,
    })

    if (!folders.includes(result.folder)) {
      folders.push(result.folder)
    }

    i++
  }

  const blurImagePromises = results?.resources?.map((image) => {
    return getBase64ImageUrl(image)
  })

  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises)

  for (let i = 0; i < reducedResults.length; i++) {
    reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i]
  }

  return {
    props: {
      images: reducedResults,
      folders,
    },
  }
}
