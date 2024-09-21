'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaLock, FaUser } from 'react-icons/fa';
import { userLogin } from '../utils/userLogin';

// Validation schema
const loginSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Login = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const onSubmit = async (loginData: { username: string; password: string }) => {
    console.log('Login data:', loginData);
    try {
      const { error } = await userLogin(loginData);

      if (error) {
        
        setErrorMessage(error);
        setSuccessMessage('');
      } else {
        
        setSuccessMessage('Login successful!');
        setErrorMessage('');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="flex h-screen">
      <div className="bg-white w-1/2 flex flex-col items-center justify-center">
        <Image src="./image/logo.png" alt="Investika Logo" className="w-4/5" />
        <p className="text-black text-xl text-center mb-64">
          Empowering Your Financial Journey<br />
          Financial learning through investment simulations.
        </p>
      </div>

      <div className="bg-[#00113D] w-1/2 flex flex-col items-center justify-center">
        <h2 className="text-white text-5xl font-light mb-8">Login</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        
        <form onSubmit={handleSubmit(onSubmit)} className="w-3/4 max-w-lg">
          <div className="mb-6 relative">
            <FaUser className="absolute left-4 top-4 text-white text-2xl" />
            <input
              type="text"
              {...register('username')}
              placeholder="Enter Username"
              className="w-full pl-12 py-3 border-2 border-gray-300 rounded-lg bg-pink-50 text-lg"
            />
            {errors.username && <p className="text-red-500 mt-2">{errors.username.message}</p>}
          </div>

          <div className="mb-6 relative">
            <FaLock className="absolute left-4 top-4 text-white text-2xl" />
            <input
              type="password"
              {...register('password')}
              placeholder="Enter Password"
              className="w-full pl-12 py-3 border-2 border-gray-300 rounded-lg bg-pink-50 text-lg"
            />
            {errors.password && <p className="text-red-500 mt-2">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className={`w-full py-4 text-2xl text-white bg-[#FFB700] rounded-lg font-medium ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-500'
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
