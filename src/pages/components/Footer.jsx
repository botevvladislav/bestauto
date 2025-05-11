import React from 'react';
import { MdLocationOn } from 'react-icons/md';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { HiOutlineMail } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer class="text-center md:text-left w-screen mx-auto px-5">
    <h1 className='font-black text-[#1C1C1C] text-center text-6xl sm:text-7xl md:text-8xl lg:text-9xl md:py-6'>
            КОНТАКТИ
    </h1>
    <div class="container mt-4 mx-auto">
        <div class="grid md:grid-cols-3">
        <div class="font-medium mb-5 flex flex-col text-white items-center md:items-start">
            <div className='flex'>
            <MdLocationOn className='mr-2' size={20}/>
            <p className='text-sm mb-3 mr-2'>ул. „Околовръстен път <br /> 4003 Труд, Пловдив</p>
            </div>
            <div className='flex'>
            <BsFillTelephoneFill className='mr-2 ml-1' size={14} />
            <p className='text-sm mb-3'>0882669586</p>
            </div>
            <div className='flex'>
            <HiOutlineMail className='mr-2' size={18}/>
            <p className='text-sm mb-3'>info@bestauto85.com</p>
            </div>
        </div>
            <ul class="mb-6 list-none text-white font-bold">
                <li className='mb-3'><Link to="/cars">Автомобили</Link></li>
                <li className='mb-3'><Link to="/autoparts">Авточасти</Link></li>
                <li className='mb-3'><Link to="/leasing">Лизинг</Link></li>
                <li className='mb-3'><Link to="/warranty">Гаранция</Link></li>
                <li className='mb-3'><Link to="/about">За нас</Link></li>
            </ul>
        <iframe className='w-full' width="429.3" height="240" id="gmap_canvas" src="https://maps.google.com/maps?q=best%20auto%2085&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
        </div>
    </div>
    <div
        class="p-4 text-center text-neutral-700 dark:text-neutral-200">
        © 2023: 
        <a
        class="text-neutral-800 dark:text-neutral-400"
        href=""
        >БЕСТ АУТО - 85 ЕООД Всички права запазени.</a>
    </div>
  </footer>
  );
};
export default Footer;