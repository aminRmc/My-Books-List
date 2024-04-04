import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, login } from '@/store/slice/connexion';

const Register = () => {
  const dispatch = useDispatch();
  // State hooks for form inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mail, setMail] = useState('');
  // State to track if registration was successful
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the form from reloading the page
    try {
      // Assuming `register` returns a promise
      // Only dispatch register if all fields are filled
      username === "" && password === "" && mail === "" ? "" : 
      await dispatch(register({ user: username, mail: mail, mdp: password , fav:[],avatar:'' }));
      setRegistrationSuccess(true); // Update success state on successful registration
    } catch (error) {
      console.error("Error during registration", error);
      setRegistrationSuccess(false); // Reset success state on failure
    }
  };

  return (
    <div className='bg-info h-[350px] flex flex-col w-[300px] justify-center items-center rounded-3xl'>
      <h2>Register</h2>
      <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
        {/* Input fields for username, mail, and password */}
        <input 
          className='p-1'
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className='p-1'
          type="mail"
          placeholder="E-mail"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
        <input
          className='p-1'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Submit button for the form */}
        <button type="submit">Sign Up</button>
      </form>
      {/* Conditional rendering to show a success message */}
      {registrationSuccess && <p className='text-succes'> Welcome {username}! You have successfully registered.</p>}
      {/* Button to trigger login action */}
      <button className='btn bg-primary rounded-3xl' onClick={() => { dispatch(login()) }}>Login</button>
    </div>
  );
};

export default Register;
