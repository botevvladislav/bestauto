import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div class="mb-32 mt-44 md:mt-44 lg:mt-44 xl:mt-44 grid w-screen px-7 md:px-14 py-8 lg:py-16 lg:grid-cols-12">
        <div class="ml-5 place-self-center md:col-span-1 lg:col-span-12 items-center flex flex-col text-center">
            <h1 class="max-w-3xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-4xl xl:text-5xl text-white">Гарантиран произход!</h1>
            <p class="max-w-3xl mb-6 font-md text-gray-200 lg:mb-6 md:text-xl lg:text-xl">Директен вносител на употребявани автомобили от Южна Корея с гаранция!</p>
            <a href="#" class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-bold text-center text-white rounded-lg bg-[#E39002]">
            <Link to="/cars">Нашите оферти</Link>
                <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </a>
        </div>
        <div class="hidden lg:mt-0 lg:col-span-5">
            <img src="https://firebasestorage.googleapis.com/v0/b/best-auto-1c303.appspot.com/o/2018-hyundai-sonata-png-10.png?alt=media&token=1b93ec6a-2f29-40e8-8502-3710416e7650" alt="mockup"></img>
        </div>  
    </div>
  );
};

export default Hero;