// import React, { useState } from 'react';
// import './styles/SignUp.css';
// import { Link } from 'react-router-dom';
// import { auth } from './firebase';
// import { signInWithEmailAndPassword} from 'firebase/auth';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       console.log('User logged in successfully');
//       // Handle successful sign up (e.g., redirect to login or home page)
//     } catch (error) {
//       console.error('Error logging in:', error);
//       // Handle error (e.g., display error message)
//     }
//   };

//   return (
//     <div>
//       <form className='signup-form' onSubmit={handleSubmit}>
//         <h2> Login</h2>
//         <label htmlFor='email'>Email</label>
//         <input
//           type='email'
//           id='email'
//           name='email'
//           required
//           placeholder='Email'
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <label htmlFor='password'>Password</label>
//         <input
//           type='password'
//           id='password'
//           name='password'
//           required
//           placeholder='Password'
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type='submit'>Login</button> <br/>
//         <p>Don't have account? <Link to='/signup'>Register</Link></p>
//       </form>
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from 'react';
// import './styles/login.css';
// import { Link, Navigate } from 'react-router-dom';
// import { auth } from './firebase';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import Navbar from './Navbar';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       console.log('User logged in successfully');
//       setIsLoggedIn(true); // Set login state to true on successful login
//     } catch (error) {
//       console.error('Error logging in:', error);
//       setError('Invalid email or password. Please try again.');
//     }
//   };

//   // Redirect to the profile view if the user is logged in
//   if (isLoggedIn) {
//     return <Navigate to="/matchmaking" />;
//   }

//   return (
//     <div className='singup-container'>
//       <Navbar />
      
//       <form className="signup-form" onSubmit={handleSubmit}>
//         <h2>Login</h2>
//         {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if login fails */}
//         <label htmlFor="email">Email</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           required
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <label htmlFor="password">Password</label>
//         <input
//           type="password"
//           id="password"
//           name="password"
//           required
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Login</button> <br />
//         <p>
//           Don't have an account? <Link to="/signup">Register</Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from 'react';
// import './styles/login.css'; // Path to the new login.css
// import { Link, Navigate } from 'react-router-dom';
// import { auth } from './firebase';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import Navbar from './Navbar';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       console.log('User logged in successfully');
//       setIsLoggedIn(true);
//     } catch (error) {
//       console.error('Error logging in:', error);
//       setError('Invalid email or password. Please try again.');
//     }
//   };

//   if (isLoggedIn) {
//     return <Navigate to="/dashboard" />;
//   }

//   return (
//     <div className="login-container">
//       <Navbar />
//       <form className="login-form" onSubmit={handleSubmit}>
//         <h2>Login</h2>
//         {error && <p className="error-message">{error}</p>}
//         <label htmlFor="email">Email</label>
//         <input
//           type="email"
//           id="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <label htmlFor="password">Password</label>
//         <input
//           type="password"
//           id="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Login</button>
//         <p>
//           Don't have an account? <Link to="/signup">Register</Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import './styles/login.css'; // Path to the new login.css
import { Link, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Navbar from './Navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in successfully');
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Invalid email or password. Please try again.');
    }
  };

  // Redirect to matchmaking view if the user is logged in
  if (isLoggedIn) {
    return <Navigate to="/matchmaking" />;
  }

  return (
    <div className="login-container">
      <Navbar />
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/signup">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
