// import React from 'react'
// import '././styles/SignUp.css'



// const SignUpForm = () => {
//   const [Email, setEmail ] = useState('')
//   const [Password, setPassword] = useState('')
//   return (
//     <div className='signup-container'>
//         <form className='signup-form'>
//             <h2>Sign Up</h2>
//             <label htmlFor='email'>Email</label>
//             <input type='email' id='email' name='email' required placeholder='Email'/>
//             <label htmlFor='password'>Password</label>
//             <input type='password' id='password' name='password' required placeholder='Password'/>
//             <button type='submit'>Sign Up</button> <br/>
//             <p> Already Registered? <link to='/login'>Login</link></p>
//         </form>
//     </div>
//   )
// }

// export default SignUpForm

// import React from 'react';
// import './styles/SignUp.css';
// import { Link } from 'react-router-dom';
// import {auth} from './firebase'
// import {createUserWithEmailAndPassword} from 'firebase/auth'

// const SignUpForm = () => {
//   const {Email, setEmail } = useState('')
//   const {Password, setPassword} = useState('')
//   const handleSumbit = (e) => {
//     e.preventDefault()
//       try {
//         createUserWithEmailAndPassword(auth, Email, Password)
//         console.log('User Created Successfully')
//       } catch (error) {
//         console.log(error)
//       }
//   }
//   return (
//     <div className='signup-container'>
//       <form className='signup-form' onSubmit={handleSumbit}>
//         <h2>Sign Up</h2>
//         <label htmlFor='email'>Email</label>
//         <input type='email' id='email' name='email' required placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
//         <label htmlFor='password'>Password</label>
//         <input type='password' id='password' name='password' required placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
//         <button type='submit'>Sign Up</button> <br />
//         <p>Already Registered? <Link to='/login'>Login</Link></p>
//       </form>
//     </div>
//   );
// };

// export default SignUpForm;


// import React, { useState } from 'react';
// import './styles/SignUp.css';
// import { Link } from 'react-router-dom';
// import { auth } from './firebase';
// import { createUserWithEmailAndPassword } from 'firebase/auth';

// const SignUpForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       // Handle successful sign up (e.g., redirect to login or home page)
//     } catch (error) {
//       console.error('Error signing up:', error);
//       // Handle error (e.g., display error message)
//     }
//   };

//   return (
//     <div>
//       <form className='signup-form' onSubmit={handleSubmit}>
//         <h2>Sign Up</h2>
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
//         <button type='submit'>Sign Up</button> <br/>
//         <p>Already Registered? <Link to='/login'>Login</Link></p>
//       </form>
//     </div>
//   );
// };

// export default SignUpForm;


import React, { useState } from "react";
import "./styles/SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    setSuccess(""); // Reset success message

    if (!name || !age) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      // Step 1: Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Step 2: Save additional user data in Firestore
      await setDoc(doc(db, "people", userId), {
        name: name,
        age: parseInt(age), // Ensure age is stored as a number
        email: email,
        userId: userId,
      });

      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login"); // Redirect to login after 2 seconds
      }, 2000);
    } catch (error) {
      console.error("Error signing up:", error);
      setError(error.message);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        {/* Display Success or Error Alerts */}
        {success && <p className="success-alert">{success}</p>}
        {error && <p className="error-alert">{error}</p>}

        {/* Name Field */}
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Age Field */}
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          name="age"
          placeholder="Your Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        {/* Email Field */}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Field */}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Submit Button */}
        <button type="submit">Sign Up</button>
        <br />
        <p>
          Already Registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
