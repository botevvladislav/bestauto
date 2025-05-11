import React from 'react';
import { useState } from 'react';
import BigCar from './BigCar';
import CarStatus from './CarStatus';


const MediumCar = ({car}) => {
  const [selectedCar, setSelectedCar] = useState(null);

  let isSoldStyle = ''

  const handleSelectCar = (car) => {
    setSelectedCar(car);
    }

  const handleCloseCar = () => {
    setSelectedCar(null);
  }

  if (car.status === 'Продаден') {
    isSoldStyle = 'opacity-20'
  } else { isSoldStyle = '' }


  return (
    <div className={`bg-[#1C1C1C] w-[300px] h-[450px] rounded-xl overflow-hidden shadow-lg flex flex-col mr-10 mb-10`}>
          <img
        className={`${isSoldStyle}`}
        src={car.imageUrls[0]}
        alt="Car"
        style={{ width: '100%', height: '200px', objectFit: 'cover' }} // Add the inline style here
      />
          <CarStatus status={car.status} />
          <div className="ml-5 mt-3 flex flex-col items-start">
              <div className="font-semibold text-xl text-[#E39002] mb-2">{car.make} {car.model}</div>
              <div className="text-gray-400 font-bold text-md mb-2">Година: {car.year}</div>
              <div className="text-gray-400 font-bold text-md mb-2">Пробег: {car.mileage}</div>
              <div className="text-white font-bold text-lg mt-1 mb-0">Цена: {car.price}</div>
          </div>
          <button className="mt-8 text-white text-lg font-bold mx-5 py-2 bg-[#E39002] items-center" onClick={() => handleSelectCar(car)}>
          ВИЖ ТУК
      </button>
      {selectedCar && <BigCar car={car} onClose={handleCloseCar} />}
    </div>
  )
}

export default MediumCar;