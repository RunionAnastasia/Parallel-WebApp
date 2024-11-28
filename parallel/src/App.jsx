// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import SignUpForm from './SignUpForm'
// import {BrowserRouter, Routes, Route} from 'react-router-dom'
// import Login from './login'

// function App() {
//   const [count, setCount] = useState(0)
 
//   return (
//     <>
//     <BrowserRouter> 
//       <Routes> 
//         <Route path='/signup' element={<SignUpForm />} />
//         <Route path='/login' element={<Login />} /> 
      
//       </Routes>
//     </BrowserRouter> 
//     </>
//   )
// }

// export default App


//regular 
// import './App.css';
// import LandingPage from './LandingPage';
// import SignUpForm from './SignUpForm';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Login from './login';
// import Header from './Header';
// import ProfileView from './ProfileView';
// import MatchmakingView from './MatchMakingView';
// import ChatView from './ChatView';
// import { AppProvider } from './AppContext'; // Import AppProvider
// // import SwipeCards from './SwipeCards';
// import ProfileEditView from './ProfileEditView';
// import MatchesView from './MatchesView';
// // import SettingsView from './SettingsView';

// function App() {
//   return (
//     <AppProvider>
//       <BrowserRouter> 
//        <Header />
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/signup" element={<SignUpForm />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/profileview" element={<ProfileView />} />
//           <Route path="/matchmaking" element={<MatchmakingView />} />
//           <Route path="/chat" element={<ChatView />} />
//           <Route path="/edit-profile" element={<ProfileEditView />} />
//           <Route path="/matches" element={<MatchesView />} />
//           {/* <Route path="/settings" element={<SettingsView />} /> */}
//           {/* <Route path="/swipe" element={<SwipeCards />} /> */}
//         </Routes>
//       </BrowserRouter>
//     </AppProvider>
//   );
// }

// export default App;





// import './App.css';
// import LandingPage from './LandingPage';
// import SignUpForm from './SignUpForm';
// import Login from './Login';
// import Header from './Header';
// import ProfileView from './ProfileView';
// import MatchmakingView from './MatchmakingView';
// import ChatView from './ChatView';
// import ProfileEditView from './ProfileEditView';
// import MatchesView from './MatchesView';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { AppProvider } from './AppContext';
// import { auth } from './firebase';
// import { useEffect, useState } from 'react';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(true); // To handle loading state

//   useEffect(() => {
//     // Listen to auth state changes
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setIsLoggedIn(!!user); // Set `isLoggedIn` based on user authentication status
//       setLoading(false); // Stop loading once the auth state is determined
//     });

//     return () => unsubscribe(); // Cleanup listener
//   }, []);

//   if (loading) {
//     // Show a loading spinner or placeholder while determining auth state
//     return <div className="loading">Loading...</div>;
//   }

//   return (
//     <AppProvider>
//       <BrowserRouter>
//         {isLoggedIn && <Header />} {/* Only show Header when logged in */}
//         <Routes>
//           {isLoggedIn ? (
//             <>
//               {/* Default logged-in route */}
//               <Route path="/" element={<Navigate to="/matchmaking" replace />} />
//               <Route path="/matchmaking" element={<MatchmakingView />} />
//               <Route path="/profileview" element={<ProfileView />} />
//               <Route path="/chat" element={<ChatView />} />
//               <Route path="/edit-profile" element={<ProfileEditView />} />
//               <Route path="/matches" element={<MatchesView />} />
//               {/* Add other protected routes here */}
//             </>
//           ) : (
//             <>
//               {/* Default logged-out route */}
//               <Route path="/" element={<LandingPage />} />
//               <Route path="/signup" element={<SignUpForm />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="*" element={<Navigate to="/" replace />} />
//             </>
//           )}
//         </Routes>
//       </BrowserRouter>
//     </AppProvider>
//   );
// }

// export default App;


// import './App.css';
// import LandingPage from './LandingPage';
// import SignUpForm from './SignUpForm';
// import Login from './Login';
// import Header from './Header';
// import ProfileView from './ProfileView';
// import MatchmakingView from './MatchMakingView';
// import ChatView from './ChatView';
// import ProfileEditView from './ProfileEditView';
// import MatchesView from './MatchesView';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { AppProvider } from './AppContext';
// import { auth } from './firebase';
// import { useEffect, useState } from 'react';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(true); // To handle loading state

//   useEffect(() => {
//     // Listen to auth state changes
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setIsLoggedIn(!!user); // Set `isLoggedIn` based on user authentication status
//       setLoading(false); // Stop loading once the auth state is determined
//     });

//     return () => unsubscribe(); // Cleanup listener
//   }, []);

//   if (loading) {
//     // Show a loading spinner or placeholder while determining auth state
//     return <div className="loading">Loading...</div>;
//   }

//   return (
//     <AppProvider>
//       <BrowserRouter>
//         {isLoggedIn ? (
//           <>
//             <Header /> {/* Show Header when logged in */}
//             <Routes>
//               {/* Default logged-in route */}
//               <Route path="/" element={<Navigate to="/matchmaking" replace />} />
//               <Route path="/matchmaking" element={<MatchmakingView />} />
//               <Route path="/profileview" element={<ProfileView />} />
//               <Route path="/chat" element={<ChatView />} />
//               <Route path="/edit-profile" element={<ProfileEditView />} />
//               <Route path="/matches" element={<MatchesView />} />
//               {/* Add other protected routes here */}
//             </Routes>
//           </>
//         ) : (
//           <Routes>
//             {/* Default logged-out route */}
//             <Route path="/" element={<LandingPage />} />
//             <Route path="/signup" element={<SignUpForm />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         )}
//       </BrowserRouter>
//     </AppProvider>
//   );
// }

// export default App;


// import './App.css';
// import LandingPage from './LandingPage';
// import SignUpForm from './SignUpForm';
// import Login from './Login';
// import Header from './Header';
// import ProfileView from './ProfileView';
// import MatchmakingView from './MatchMakingView';
// import ChatView from './ChatView';
// import ProfileEditView from './ProfileEditView';
// import MatchesView from './MatchesView';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { AppProvider } from './AppContext';
// import { auth } from './firebase';
// import { useEffect, useState } from 'react';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(true); // To handle loading state

//   useEffect(() => {
//     // Listen to auth state changes
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setIsLoggedIn(!!user); // Set `isLoggedIn` based on user authentication status
//       setLoading(false); // Stop loading once the auth state is determined
//     });

//     return () => unsubscribe(); // Cleanup listener
//   }, []);

//   if (loading) {
//     // Show a loading spinner or placeholder while determining auth state
//     return <div className="loading">Loading...</div>;
//   }

//   return (
//     <AppProvider>
//       <BrowserRouter>
//         {isLoggedIn && <Header /> } {/* Show Header only when logged in */}
       
//         <Routes>
//           {isLoggedIn ? (
//             <>
//               {/* Default logged-in route */}
//               <Route path="/" element={<Navigate to="/matchmaking" replace />} />
//               <Route path="/matchmaking" element={<MatchmakingView />} />
//               <Route path="/profileview" element={<ProfileView />} />
//               <Route path="/chat" element={<ChatView />} />
//               <Route path="/edit-profile" element={<ProfileEditView />} />
//               <Route path="/matches" element={<MatchesView />} />
//               {/* Add other protected routes here */}
//             </>
//           ) : (
//             <>
//               {/* Default logged-out route */}
//               <Route path="/" element={<LandingPage />} />
//               <Route path="/signup" element={<SignUpForm />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="*" element={<Navigate to="/" replace />} />
//             </>
//           )}
//         </Routes>
//       </BrowserRouter>
//     </AppProvider>
//   );
// }

// export default App;




//trial 

import './App.css';
import LandingPage from './LandingPage';
import SignUpForm from './SignUpForm';
import Login from './Login';
import Header from './Header';
import ProfileView from './ProfileView';
import MatchmakingView from './MatchmakingView';
import ChatView from './ChatView';
import ProfileEditView from './ProfileEditView';
import MatchesView from './MatchesView';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './AppContext';
import SettingsView from './SettingsView';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/login" element={<Login />} />
          {/* Protected routes */}
          <Route
            path="*"
            element={<AuthenticatedRoutes />}
          />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

const AuthenticatedRoutes = () => {
  return (
    <>
      <Header /> {/* Header always visible on authenticated pages */}
      <Routes>
        <Route path="/matchmaking" element={<MatchmakingView />} />
        <Route path="/profileview" element={<ProfileView />} />
        <Route path="/chat" element={<ChatView />} />
        <Route path="/edit-profile" element={<ProfileEditView />} />
        <Route path="/matches" element={<MatchesView />} />
        <Route path="/" element={<Navigate to="/matchmaking" replace />} />
        <Route path="/settings" element={<SettingsView />} />
      </Routes>
    </>
  );
};

export default App;
