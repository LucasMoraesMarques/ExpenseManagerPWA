import React from 'react'

function CarouselItem({title, description, image}) {
  return (
    <div className='flex flex-col justify-center items-center h-[70vh] w-[90%] mx-auto'>
      {image}
      
      <h5 className='text-bold text-center text-3xl'>{title}</h5>
      <span className='text-center my-3'>{description}</span>
    </div>
  )
}

export default CarouselItem