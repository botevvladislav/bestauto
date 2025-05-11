import React, {useState} from 'react'
import { MdPhoneInTalk } from 'react-icons/md';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import CarsPage from '../CarsPage';


const Navbar = () => {
  const [nav, setNav] = useState(false)

  const handleNav = (event) => {
    setNav(!nav)
  }

  return (
    <div className='flex flex-row h-20 justify-between items-center w-screen text-white px-5'>
        <h1 className='text-3xl font-black text-[#E39002] py-3 px-5'><Link to="/">BESTAUTO.</Link></h1>
        <ul className='hidden md:flex font-bold text-xs pt-1 sm:text-sm md:text-md'>
            <li className='p-4 hover:text-[#E39002]'><Link to="/cars">Автомобили</Link></li>
            <li className='p-4 hover:text-[#E39002]'><Link to="/autoparts">Авточасти</Link></li>
            <li className='p-4 hover:text-[#E39002]'><Link to="/leasing">Лизинг</Link></li>
            <li className='p-4 hover:text-[#E39002]'><Link to="/warranty">Гаранция</Link></li>
            <li className='p-4 hover:text-[#E39002]'><Link to="/about">За нас</Link></li>
        </ul>
        <div onClick={handleNav} className='block md:hidden'>
          {nav ? <AiOutlineClose className='m-6' size={25}/> : <AiOutlineMenu className='m-6' size={25} />}
        </div>
        <div className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r bg-[#191919] border-black ease-in-out duration-500 z-50' : 'ease-out duration-500 fixed left-[-100%]'}>
          <ul className='pt-24'>
          <li className='p-4 border-b border-black'><Link to="/cars">Автомобили</Link></li>
            <li className='p-4 border-b border-black'><Link to="/autoparts">Авточасти</Link></li>
            <li className='p-4 border-b border-black'><Link to="/leasing">Лизинг</Link></li>
            <li className='p-4 border-b border-black z-50'><Link to="/warranty">Гаранция</Link></li>
            <li className='p-4'><Link to="/about">За нас</Link></li>
          </ul>
        </div>
    </div>
  )
}

export default Navbar