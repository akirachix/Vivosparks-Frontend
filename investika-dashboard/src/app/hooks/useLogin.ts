import { useState } from 'react';
import { userLogin as loginAPI } from '../utils/userLogin';

const useLogin = (url = 'api/login') => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const userLogin = async (loginData: { username: string, password: string }) => {
    try {
      setIsSubmitting(true);
      const { data, error } = await loginAPI(loginData);

      if (error) {
        setErrorMessage(error);
        setSuccessMessage('');
      } else {
        setSuccessMessage('Login successful!');
        setErrorMessage('');
        return data; 
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    errorMessage,
    successMessage,
    userLogin,
  };
};

export default useLogin;
