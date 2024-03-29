import { useRouter } from 'next/router'
import useKeypress from 'react-use-keypress'
import { CldImage } from 'next-cloudinary'
import { useLastViewedPhoto } from '@/lib/utils/useLastViewedPhoto'
import SharedModal from './SharedModal'

export default function Carousel({ index, currentPhoto }) {
  const router = useRouter()
  const [, setLastViewedPhoto] = useLastViewedPhoto()

  function closeModal() {
    setLastViewedPhoto(currentPhoto.id)
    router.push('/', undefined, { shallow: true })
  }

  function changePhotoId(newVal) {
    return newVal
  }

  useKeypress('Escape', () => {
    closeModal()
  })

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <button
        className="absolute inset-0 z-30 cursor-default bg-black backdrop-blur-2xl"
        onClick={closeModal}
      >
        <CldImage
          src={currentPhoto.blurDataUrl}
          className="pointer-events-none h-full w-full"
          alt="blurred background"
          fill
          priority
        />
      </button>
      <SharedModal
        index={index}
        changePhotoId={changePhotoId}
        currentPhoto={currentPhoto}
        closeModal={closeModal}
        navigation={false}
      />
    </div>
  )
}
