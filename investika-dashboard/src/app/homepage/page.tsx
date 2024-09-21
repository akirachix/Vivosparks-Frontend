import React from 'react';
import Image from 'next/image';

const HomePage = () => {
  return (
    
    <div className="relative h-screen flex items-center justify-center bg-cover bg-no-repeat" style={{ backgroundImage: 'url("/images/background-image.png")' }}>
     
      <div className="absolute top-4 left-4 z-50">
        <Image src="/images/investika-logo.png" alt="Investika Logo"
         className="w-24 sm:w-32 md:w-40 lg:w-48 xl:w-56"
         width={150}  
         height={100}
          />
      </div>

      <div className="relative z-10 text-center text-white px-4 flex flex-col items-center">
        <h1 className="text-6xl md:text-6xl font-bold mb-4">Empowering Your Financial Journey</h1>
        <p className="text-4xl md:text-3xl font-light mb-6">Financial learning through investment simulations, a Financial Snapshot tool.</p>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded-lg">
          Continue
        </button>
      </div>

      <div className="absolute inset-0 bg-black opacity-60"></div>
    </div>
  );
};

export default HomePage;





