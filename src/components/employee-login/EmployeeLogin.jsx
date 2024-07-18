// components/EmployeeLoginComponent.js
import { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import EmployeeLoginService from '../../services/employeeLoginService/EmployeeLoginService';
import Loader from '../loader/Loader';

const EmployeeLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  // const history = useHistory();

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  };

  const clearError = () => {
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      setErrorMessage('Please enter valid email and password.');
      setLoading(false);
      clearInputs();
      return;
    }

    const loginData = { email, password };

    try {
      const response = await EmployeeLoginService.employeeLogin(loginData);
      if (response.statuscode === 200) {
        setErrorMessage('');
        console.log('Login successful:', response);
        setLoading(false);
        clearInputs();
        clearError();
        window.location.reload();
        // history.push('/employeedash'); // Uncomment this line to navigate to the employee dashboard
      } else {
        console.error('Login error:', response);
        setLoading(false);
        setErrorMessage('Invalid Credentials');
        clearInputs();
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
      setErrorMessage('An error occurred. Please try again later.');
      clearInputs();
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-50 to-blue-100">
      {!loading ? (
        <div className="w-full max-w-md bg-white rounded-lg px-8 py-12 shadow-lg flex flex-col items-center">
          <h1 className="text-center text-2xl font-medium mb-8">Welcome Back Employee!</h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
              <input
                type="email"
                id="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-blue-500 focus:ring-opacity-50"
                placeholder="youremail@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
              <input
                type="password"
                id="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-blue-500 focus:ring-opacity-50"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <a href="#" className="text-blue-500 text-xs float-right mt-1">Forgot Password?</a>
            </div>

            <div className="flex items-center mb-4">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700">
                Login
              </button>
            </div> 
            <div className="text-red-500 text-sm text-center h-5">{errorMessage}</div>

            <div className="text-center text-gray-500 text-sm">
              Sign up as Employee <a href="#" className="text-blue-500 font-bold">Contact Admin</a>
            </div>
          </form>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default EmployeeLogin;
