import React from 'react'
import Navbar from './components/Navbar';
import Footer from './components/Footer';


const AutopartsPage = () => {
  return (
    <div>
      <Navbar />
      <div className='mb-80 mt-40 h-full'>
      <h1 className='text-3xl lg:text-xl px-10 lg:my-20 mb-3 font-semibold text-center text-white'>Авточасти</h1>
      <h3 className='text-sm lg:text-md lg:text-xl px-5 lg:px-40 lg:my-20 font-semibold text-center text-white'>Предлагаме оригинални части за всички модели коли,които продаваме.</h3>
      </div>
      <Footer />
    </div>
  )
}

export default AutopartsPage