import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import ImageGrid from '@/components/insta-explore/ImageGrid'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Explore({ posts }) {
  const [user, loading, error] = useAuthState(auth)
  const router = useRouter()

  useEffect(() => {
    if (!(user || loading)) {
      router.push('/account/login')
    }
  }, [user, loading])

  // Server-render loading state
  if (!user || user.isLoggedIn === false) {
    return <p>Loading...</p>
  }

  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <section className="rounded-lg bg-oliveGreen">
        <div className=" mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="p-3 text-left">
            <ImageGrid />
          </div>
        </div>
      </section>
    </>
  )
}
