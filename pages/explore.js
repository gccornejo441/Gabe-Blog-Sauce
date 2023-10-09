import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import ImageGrid from '@/components/insta-explore/ImageGrid'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Dropzone from '@/components/DropZone'

export default function Explore() {
  const [user, loading, error] = useAuthState(auth)
  const router = useRouter()

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
      {/* <div className="my-2 rounded-lg bg-forestGreen50">
        <div className="flex justify-center space-x-4 px-4 py-4 sm:px-6 lg:px-8">
          <a
            href="#"
            className="text-gray-600 hover:text-gray-900 focus:text-gray-900 focus:outline-none"
          >
            Upload
          </a>
        </div>
      </div> */}
      <div>
        <Dropzone />
      </div>
      <section className="rounded-lg bg-forestGreen50">
        <div className=" mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="p-3 text-left">
            <ImageGrid />
          </div>
        </div>
      </section>
    </>
  )
}
