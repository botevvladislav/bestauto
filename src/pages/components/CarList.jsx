import React, { useState } from 'react'
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';
import DeleteMsg from './DeleteMsg';
import EditCar from './EditCar';
import { deleteDoc, doc } from "firebase/firestore"
import { db } from '../../firebase-config';


const CarList = ( {car} ) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMsgOpen, setIsMsgOpen] = useState(false);
  const id = car.id;

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleMsgOpen = () => {
    setIsMsgOpen(true);
  }

  const handleMsgClose = () => {
    setIsMsgOpen(false);
  }

  const handleDelete = async (id) => {
    try {
      const carDoc = doc(db, "cars", String(car.id));
      await deleteDoc(carDoc);
    } catch (error) {
      console.error("Error deleting car document:", error);
    }
  }


  return (
    <div className="flex flex-col sm:flex-row items-center sm:justify-between shadow-md rounded-lg bg-[#222222] w-[220px] sm:w-[93%] h-full sm:h-20 mt-6 sm:mt-0 sm:mb-5">
        <img src={car.imageUrls[0]} alt="" className="shadow-sm sm:ml-8 sm:mr-5 w-26 sm:w-20 h-20 sm:h-14 rounded-md mt-4 sm:mt-0" />
        <div className='flex sm:flex-grow flex-row'>
          <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-4 md:grid-cols-6 md:gap-2 lg:gap-4 w-full items-center text-center mt-3 sm:mt-0">
          <p className="mb-3 sm:mb-0 text-sm sm:text-md md:text-md font-bold text-white">{car.make}</p>
          <p className="mb-3 sm:mb-0 sm:hidden md:block flex-1 text-sm md:text-md text-gray-400">{car.type}</p>
          <p className="mb-3 sm:mb-0 flex-1 text-sm md:text-md text-gray-400">{car.year}</p>
          <p className="mb-3 sm:mb-0 sm:hidden md:block flex-1 text-sm md:text-md text-gray-400">{car.engine}</p>
          <p className="mb-3 sm:mb-0 flex-1 text-sm md:text-md text-gray-400">{car.status}</p>
          <p className="mb-3 sm:mb-0 flex-1 text-sm md:text-md text-gray-400">{car.price}</p>
          </div>
      </div>
      <div className="flex items-center space-x-2 sm:mr-2 lg:mr-8 md:ml-2 mb-1">
        <button onClick={handleModalOpen} type="button" className="flex px-1 sm:px-0 lg:px-4 py-2 text-sm font-bold text-white rounded-lg">
          <MdEdit className='mr-0 lg:mr-2' size={20} />
          <span className='hidden lg:block'>Промени</span>
        </button>
        {isModalOpen && <EditCar car={car} onClose={handleModalClose} />}
        <button onClick={handleDelete} type="button" className="flex px-1 sm:px-3 py-2 text-sm font-bold text-white lg:bg-red-500 rounded-lg hover:bg-red-600">
          <MdDelete className='lg:mr-2 fill-red-500 lg:fill-white' size={20}/>
          <span className='hidden lg:block'>Изтрий</span>
        </button>
        {isMsgOpen && <DeleteMsg car={car} onClose={handleMsgClose} />}
      </div>
    </div>
  )
}

export default CarList