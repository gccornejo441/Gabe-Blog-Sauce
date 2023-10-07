import * as React from 'react'
import Image from '../Image'
import PropTypes from 'prop-types'

const ImageItem = ({ title, description, imgSrc, width, height }) => {
  return (
    <Image
      alt={title}
      src={imgSrc}
      className="object-cover object-center md:h-36 lg:h-48"
      width={width}
      height={height}
    />
  )
}

ImageItem.propType = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  imgSrc: PropTypes.string.isRequired,
}

export default ImageItem
