import { CldImage } from 'next-cloudinary'
import Link from 'next/link'

export default function ImageCard({
  id,
  public_id,
  width,
  height,
  blurDataUrl,
  lastViewedPhoto,
  lastViewedPhotoRef,
}) {
  return (
    <Link
      key={id}
      href={`/?photoId=${id}`}
      as={`/p/${id}`}
      ref={id === lastViewedPhoto ? lastViewedPhotoRef : null}
      shallow
      className={`after:content group after:shadow-highlight relative block  w-full cursor-zoom-in transition after:pointer-events-none after:absolute after:inset-0 after:rounded-lg`}
    >
      <CldImage
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
        sizes="
          (max-width: 648px) 100vw,
          25vw
        "
      />
    </Link>
  )
}
