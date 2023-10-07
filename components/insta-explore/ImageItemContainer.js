import ImageItem from './ImageItem'
import LoadingSpinner from '../LoaderSpinner'

const ImageItemContainer = ({ images }) => {
  return (
    <>
      {images ? (
        <ImageItem title="Random" imgSrc={images} description="Random" width={309} height={309} />
      ) : (
        <LoadingSpinner />
      )}
    </>
  )
}

export default ImageItemContainer
