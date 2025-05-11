import React from 'react'
import { useState } from 'react';
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';


function BigCar({ car, onClose }) {
  const [selectedCar, setSelectedCar] = useState(null);
  
  const images = car.imageUrls.map((imageUrl) => ({ src: imageUrl }));
  console.log(car.extras)
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[#191919] bg-opacity-90 z-10 overflow-auto">
      <div className="relative bg-[#222222] mx-5 rounded-lg max-w-[400px] sm:max-w-[400px] md:max-w-[700px] h-full max-h-[95%] overflow-hidden overflow-y-auto">
      <button onClick={onClose} type="button" class="text-red-500 bg-transparent rounded-l g text-sm top-2 p-1.5 ml-auto relative left-[44%] md:left-[46%] items-center hover:bg-gray-600 hover:text-white">
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span class="sr-only">Close modal</span>
              </button>
        <div className="grid grid-cols-1 md:grid-cols-1 w-full">
          
          <div  className="mt-6 mb-6 px-4 items-center w-full">
            <Carousel
              style={{ maxWidth: 500, maxHeight: 500, backgroundColor: '#222222'}}
              shouldLazyLoad={true}
              images={images} 
              hasMediaButton={false}
            />
          </div>
          <div className="pl-4 mt-5 md:mt-4 text-start">
            <h2 className="text-xl md:text-2xl text-[#E39002] font-bold mb-2 mt-3">
              {car.make} {car.model}
            </h2>
            <p className="text-gray-400 mb-2">
            |  {car.year} г.  |  {car.mileage} км |  {car.type}  | {car.engine}  | {car.status} | 
            </p>
            <div className="text-sm md:text-md flex flex-col text-white pt-5 md:px-0 justify-between">
              <h2 class="mb-2 text-lg font-semibold text-white">Екстри:</h2>
              <ul className="w-full space-y-1 text-gray-500 list-inside dark:text-gray-400">
              <div className='flex flex-col'>
                {car.extras.map((extra) => (
                  <li className="flex items-start text-xs mb-1 px-auto py-1" key={extra.id}>
                    <svg
                      className="w-4 h-4 mr-1.5 text-green-400 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    {extra.key}
                  </li>
                ))}
              </div>
            </ul>
              <div className="text-white font-bold text-lg flex mt-5 mr-5 pb-5">Цена: {car.price}</div> 
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BigCar;