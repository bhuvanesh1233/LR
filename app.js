import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [message, setMessage] = useState('');

   const handleRegister = async () => {
      try {
         const response = await axios.post('http://localhost:5000/register', { username, password });
         setMessage(response.data);
      } catch (error) {
         setMessage('Error during registration');
      }
   };

   const handleLogin = async () => {
      try {
         const response = await axios.post('http://localhost:5000/login', { username, password });
         localStorage.setItem('token', response.data.token);
         setMessage('Logged in successfully');
      } catch (error) {
         setMessage('Invalid credentials');
      }
   };

   return (
      <div>
         <h1>MERN Authentication</h1>
         <div>
            <input
               type="text"
               placeholder="Username"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
            />
            <input
               type="password"
               placeholder="Password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Register</button>
            <button onClick={handleLogin}>Login</button>
         </div>
         {message && <p>{message}</p>}
      </div>
   );
};

export default App;
