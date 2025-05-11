import React from 'react'
import Hero from './components/Hero';
import Cars from './components/Cars';
import Footer from './components/Footer';
import { Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';

function Home() {
  return (
    <div className="bg-[url('https://firebasestorage.googleapis.com/v0/b/best-auto-1c303.appspot.com/o/peakpx%20(3).jpg?alt=media&token=ba89b41d-cb6b-4555-816e-9ed60cfc6b33')] sm:bg-[url('https://firebasestorage.googleapis.com/v0/b/best-auto-1c303.appspot.com/o/peakpx.jpg?alt=media&token=9cbd03fa-6121-497a-940b-1d8af580871d')] bg-center sm: bg-local bg-cover h-[100vh] bg-no-repeat">
    <div className='w-full h-screen' style={{backgroundColor: `rgba(0,0,0,0.7)`,}}>
        <Navbar />
        <Hero />
        </div>
        <Cars />
        <Footer />
        </div>
  );

}

export default Home;