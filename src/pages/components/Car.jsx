import React from 'react'

const Car = ({ car }) => {
  return (
    <div class="bg-[#1C1C1C] rounded-xl overflow-hidden shadow-lg flex flex-col m-2">
            <div class="px-6 py-4">
                <div class="text-white font-bold text-xl mb-2">{car.make}</div>
            </div>
            <img class="object-cover h-48 max-w-40" src={car.imageUrls[0]} alt="Car"></img>
            <div class="text-white font-semibold m-5 border border-[#E39002] max-w-40">
            {car.price}
            </div>
    </div>
  )
}

export default Car