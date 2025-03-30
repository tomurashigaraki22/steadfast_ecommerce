"use client"

import React, { useEffect, useRef, useState } from "react"

interface PriceRangeSliderProps {
  min: number
  max: number
  minValue: number
  maxValue: number
  onValueChange: (values: { min: number; max: number }) => void
  step?: number
  className?: string
}

export default function PriceRangeSlider({
  min,
  max,
  minValue,
  maxValue,
  onValueChange,
  step = 1,
  className,
}: PriceRangeSliderProps) {
  const [localMin, setLocalMin] = useState(minValue ?? min)
  const [localMax, setLocalMax] = useState(maxValue ?? max)
  const rangeRef = useRef<HTMLDivElement>(null)
  
  // Calculate the percentage for styling
  const getPercent = (value: number) => {
    return Math.round(((value - min) / (max - min)) * 100)
  }

  // Update the range progress bar
  useEffect(() => {
    if (rangeRef.current) {
      const minPercent = getPercent(localMin)
      const maxPercent = getPercent(localMax)
      
      rangeRef.current.style.left = `${minPercent}%`
      rangeRef.current.style.width = `${maxPercent - minPercent}%`
    }
  }, [localMin, localMax, min, max])

  // Handle min thumb change
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), localMax - step)
    setLocalMin(value)
    onValueChange({ min: value, max: localMax })
  }

  // Handle max thumb change
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), localMin + step)
    setLocalMax(value)
    onValueChange({ min: localMin, max: value })
  }

  return (
    <div className={`relative  min-h-7  w-full ${className || ''}`}>
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 bg-gray-200 rounded-full">
        <div
          ref={rangeRef}
          className="absolute h-full bg-blue-600 rounded-full"
        />
      </div>
      
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={localMin}
        onChange={handleMinChange}
        className="absolute top-1/2 -translate-y-1/2 w-full h-1 appearance-none bg-transparent pointer-events-none z-20
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:bg-blue-600
          [&::-webkit-slider-thumb]:border-2
          [&::-webkit-slider-thumb]:border-white
          [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:shadow-md
          [&::-webkit-slider-thumb]:pointer-events-auto
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-moz-range-thumb]:appearance-none
          [&::-moz-range-thumb]:bg-blue-600
          [&::-moz-range-thumb]:border-2
          [&::-moz-range-thumb]:border-white
          [&::-moz-range-thumb]:h-4
          [&::-moz-range-thumb]:w-4
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:shadow-md
          [&::-moz-range-thumb]:pointer-events-auto
          [&::-moz-range-thumb]:cursor-pointer"
      />
      
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={localMax}
        onChange={handleMaxChange}
        className="absolute top-1/2 -translate-y-1/2 w-full h-1 appearance-none bg-transparent pointer-events-none z-20
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:bg-blue-600
          [&::-webkit-slider-thumb]:border-2
          [&::-webkit-slider-thumb]:border-white
          [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:shadow-md
          [&::-webkit-slider-thumb]:pointer-events-auto
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-moz-range-thumb]:appearance-none
          [&::-moz-range-thumb]:bg-blue-600
          [&::-moz-range-thumb]:border-2
          [&::-moz-range-thumb]:border-white
          [&::-moz-range-thumb]:h-4
          [&::-moz-range-thumb]:w-4
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:shadow-md
          [&::-moz-range-thumb]:pointer-events-auto
          [&::-moz-range-thumb]:cursor-pointer"
      />
      
      
    </div>
  )
}
