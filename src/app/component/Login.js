import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reg, connect } from '@/store/slice/connexion';
import { info } from '@/store/slice/connexion';
import { maj } from '@/store/slice/connexion';
const Login = () => {
  // Accessing the users list from the Redux store.
  const users = useSelector((state) => state.connexion.tab);
  const dispatch = useDispatch();

  // Local state for username and password inputs.
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // States to manage login messages.
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // New state for success message.
 
  // Function to verify user credentials.
  const verify = () => {
    let isUserFound = false;

    users.forEach((user) => {
      if (user.user === username && user.mdp === password) {
        isUserFound = true;
        dispatch(connect());
        dispatch(info({user:user.user, mail:user.mail,fav:user.fav,avatar:user.avatar }))
        // Set success message upon successful login.
        setSuccessMessage('Connexion réussie. Bienvenue!');
      }
    });

    if (!isUserFound) {
      setError('Nom d\'utilisateur ou mot de passe incorrect.');
      // Ensure the success message is cleared if login fails.
      setSuccessMessage('');
    } else {
      // Clear the error message upon successful login.
      setError('');
    }
  }

  return (
    <div className='bg-info h-[350px] flex flex-col w-[300px] justify-center items-center rounded-3xl'>
      <h2>Connexion</h2>
      {/* Display the success message if it exists */}
      {successMessage && <p className='text-center' >{successMessage}</p>}
      {/* Display the error message if it exists */}
      {error && <p className='text-center text-secondary font-bold' >{error}</p>}
      <form className='flex flex-col gap-3' onSubmit={(e) => e.preventDefault()}>
        <input
          className='p-1'
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className='p-1'
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={verify}>Connexion</button>
      </form>
      <button className='btn bg-primary rounded-3xl' onClick={() => { dispatch(reg()) }}>Register</button>
    </div>
  );
};

export default Login;
