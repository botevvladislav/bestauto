import React, { useEffect, useState } from 'react';
import { auth } from '../firebase-config';
import { useNavigate  } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { MdAdd } from 'react-icons/md';
import CarList from './components/CarList';
import AddCar from './components/AddCar';
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from '../firebase-config';


const EditCarsPage = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "cars"));
    const unsub = onSnapshot(q, async (querySnapshot) => {
      let carsArray = [];
      querySnapshot.forEach((doc) => {
        carsArray.push({ ...doc.data(), id: doc.id });
      });
      setCars(carsArray);
    });
    return () => unsub();
  }, []);

  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        navigate('/admin');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  return (
    <div>
      {isAuthenticated ? (
        <section className="flex flex-col justify-start items-center h-full w-screen mt-5 mb-20">
        <h1 className='text-2xl md:text-3xl font-black text-[#E39002] py-3 px-5 mb-7'><Link to="/">BESTAUTO.</Link></h1>
          <div className="w-full mx-auto px-10">
              <div className="relative overflow-hidden border-b mb-0">
              <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className='text-center mb-3 md:text-start md:mb-10'>
                  <h5 className="text-md md:text-lg lg:text-xl mr-3 font-semibold dark:text-white">Автомобили</h5>
                  <p className="text-sm md:text-md lg:text-lg text-gray-500 dark:text-gray-400">Управлявайте вашите автомобили или добавете нов автомобил</p>
                  </div>
                  <button onClick={handleModalOpen} type="button"
                          className="mt-2 sm:mt-0 mb-5 flex items-center justify-center px-4 py-2 text-sm font-bold text-white rounded-lg bg-[#E39002]">
                  <MdAdd className='mr-2' size={20} />
                  Добави автомобил
                  </button>
                  {isModalOpen && <AddCar onClose={handleModalClose} />}
              </div>
              </div>
              <div className="hidden sm:flex flex-grow md:flex-row items-center mb-3 mt-2 w-full">
              <div className="flex w-24 md:w-24 lg:w-32 h-2 ml-8 mr-[10px] sm:mr-[10px] md:mr-[20px] lg:mr-3 xl:mr-4 2xl:mr-7"></div>
              <div className="grid grid-flow-row grid-cols-4 md:grid-cols-6 gap-4 w-full text-center font-bold">
              <p className="flex-1 text-sm md:text-md text-gray-500 dark:text-gray-400">Автомобил</p>
              <p className="hidden md:block flex-1 text-sm md:text-md text-gray-500 dark:text-gray-400">Купе</p>
              <p className="flex-1 text-sm md:text-md text-gray-500 dark:text-gray-400">Година</p>
              <p className="hidden md:block flex-1 text-sm md:text-md text-gray-500 dark:text-gray-400">Гориво</p>
              <p className="flex-1 text-sm md:text-md text-gray-500 dark:text-gray-400">Статус</p>
              <p className="flex-1 text-sm md:text-md text-gray-500 dark:text-gray-400">Цена</p>
              </div>
              <div className="flex mr-8 ml-11 lg:w-80 h-2"></div>
        </div>  
          </div>
          {cars.map(car => (
        <CarList car={car}></CarList>
      ))}
      </section>
      ) : (
        navigate('/admin')
      )}
    </div>
  )
}

export default EditCarsPage