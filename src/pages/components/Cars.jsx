import React, { useState, useEffect } from 'react';
import Car from './Car';
import Carousel, { Dots, slidesToShowPlugin} from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase-config';

const Cars = () => {
  const [current, setCurrent] = useState(0);
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

  return (
    <div className='w-screen h-auto mx-auto text-center flex flex-col justify-start items-center mt-10 mb-20'>
      <h1 className='mb-11 text-[#1C1C1C] text-5xl sm:text-7xl md:text-8xl lg:text-9xl md:py-6 font-black'>
        АВТОМОБИЛИ
      </h1>
      <div className='w-full flex flex-wrap justify-center items-center min-w-10'>
        {cars.length ? (
          <Carousel
            value={current}
            onChange={setCurrent}
            slides={cars.map((car) => (
              <Car car={car} key={car.id} />
            ))}
            plugins={[
              "clickToChange",
              {
                resolve: slidesToShowPlugin,
                options: {
                  numberOfSlides: 4,
                },
              },
            ]}
            breakpoints={{
              640: {
                plugins: [
                  {
                    resolve: slidesToShowPlugin,
                    options: {
                      numberOfSlides: 1,
                    },
                  },
                ],
              },
              900: {
                plugins: [
                  {
                    resolve: slidesToShowPlugin,
                    options: {
                      numberOfSlides: 2,
                    },
                  },
                ],
              },
              1240: {
                plugins: [
                  {
                    resolve: slidesToShowPlugin,
                    options: {
                      numberOfSlides: 3,
                    },
                  },
                ],
              },
            }}
          />
        ) : (
          <p>Loading cars...</p>
        )}
        <div className='flex mt-5'>
          <Dots value={current} onChange={setCurrent} number={4} />
        </div>
      </div>
    </div>
  );
};

export default Cars;