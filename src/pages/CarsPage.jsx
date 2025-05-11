import React from 'react'
import { useState, useEffect } from 'react';
import MediumCar from './components/MediumCar';
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import { db } from '../firebase-config';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


function CarsPage() {
  const [cars, setCars] = useState([]);

  React.useEffect(() => {
    const q = query(collection(db, "cars"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let carsArray = [];
      querySnapshot.forEach((doc) => {
        carsArray.push({ ...doc.data(), id: doc.id });
      });
      setCars(carsArray);
    });
    return () => unsub();
  }, []);

  return (
    <div>
    <Navbar />
    <div className='lg:ml-2 my-10 w-screen h-full text-center flex flex-col justify-start items-center xl:items-start overflow-hidden'>
      <h1 className='text-white text-2xl font-bold mx-9 mb-6'>
        АВТОМОБИЛИ
      </h1>
      <div className='ml-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {cars.map(car => (
        <MediumCar car={car}></MediumCar>
      ))}
      </div>
    </div>
    <Footer />
    </div>
  );
}

export default CarsPage;