import * as React from 'react'
import ImageItemContainer from './ImageItemContainer'
import LoadingSpinner from '../LoaderSpinner'
import axios from 'axios'

const ImageGrid = () => {
  const [imageUrl, setImageUrl] = React.useState(null)

  React.useEffect(() => {
    // Use useEffect to make the API request when the component mounts
    axios
      .get('https://picsum.photos/309/309')
      .then((res) => {
        // handling success
        setImageUrl(res.config.url) // Update imageUrl with the received image URL
      })
      .catch((err) => {
        console.log(err)
      })
  }, []) // Pass an empty array as the second argument to useEffect to ensure it only runs once (on mount)

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3">
        <ImageItemContainer images={imageUrl} />
      </div>
    </div>
  )
}

export default ImageGrid
