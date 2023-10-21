
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import '../../styles/home/slider.less'
let intervalId;
export const Slider = ({sliderImages = [], slideInterval}) => {
  // const [sliderRunning, setSliderRunning] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)


  useEffect(() => {
   intervalId = setInterval(() => {
     setCurrentImageIndex((prev) => (prev + 1) % sliderImages?.length);
    }, slideInterval);
    return () => {
      clearInterval(intervalId)
    }
  }, [slideInterval, sliderImages?.length])
  return (
    <div className='slider'>
      {/* <h2>{currentImageIndex }</h2> */}
      <img src={sliderImages[currentImageIndex]?.url} alt="" />
    </div>
  )
}
