// import React from 'react';
// import './styles/Header.css';
// import DensityLargeIcon from '@mui/icons-material/DensityLarge';
// import MessageIcon from '@mui/icons-material/Message';
// import PersonIcon from '@mui/icons-material/Person';
// import { useNavigate } from 'react-router-dom'; // Import navigation hook

// const Header = () => {
//   const navigate = useNavigate(); // Initialize navigation

//   const handleProfileClick = () => {
//     navigate('/profileview'); // Navigate to the ProfileView page
//   };

//   const handleMatchmakingClick = () => {
//     navigate('/matchmaking'); // Navigate to the Matchmaking page
//   };

//   const handleMatchesClick = () => {
//     navigate('/matches'); // Navigate to the Matchmaking page
//   };
//   const handleChatClick = () => {
//     navigate('/chat'); // Navigate to the Chat page
//   };

//   return (
//     <div className='header'>
//       <PersonIcon className='header-icon' onClick={handleProfileClick} />
//       <p className='header-icon' onClick={handleMatchesClick}>Parallel</p>
//       <DensityLargeIcon className='header-icon' onClick={handleMatchmakingClick} />
//       <MessageIcon className='header-icon' onClick={handleChatClick} /> {/* New Chat Page */}
//     </div>
//   );
// };

// export default Header;

//trial 

import React, { useContext } from 'react';
import './styles/Header.css';
import DensityLargeIcon from '@mui/icons-material/DensityLarge';
import MessageIcon from '@mui/icons-material/Message';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom'; // Import navigation hook
import { AppContext } from './AppContext'; // Import AppContext
import { Icon, IconButton } from '@mui/material';

const Header = () => {
  const { isLoggedIn } = useContext(AppContext); // Use context to get login state
  const navigate = useNavigate(); // Initialize navigation

  if (!isLoggedIn) return null; // Don't render if not logged in

  const handleProfileClick = () => {
    navigate('/profileview'); // Navigate to the ProfileView page
  };

  const handleMatchmakingClick = () => {
    navigate('/matchmaking'); // Navigate to the Matchmaking page
  };

  const handleMatchesClick = () => {
    navigate('/matches'); // Navigate to the Matches page
  };

  const handleChatClick = () => {
    navigate('/chat'); // Navigate to the Chat page
  };

  return (
    <div className="header">
      <IconButton>
        <PersonIcon className="header-icon" onClick={handleProfileClick} />
      </IconButton>
      <p className="header-icon" onClick={handleMatchesClick}>Parallel</p>
      <IconButton>
        <DensityLargeIcon className="header-icon" onClick={handleMatchmakingClick} />
      </IconButton>
      <IconButton>
         <MessageIcon className="header-icon" onClick={handleChatClick} />
      </IconButton>
    </div>
  );
};

export default Header;



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './Header';
// import ProfileView from './ProfileView';
// import Matchmaking from './MatchMakingView';
// import Chat from './ChatView';
// // import SwipeCards from './SwipeCards';

// function App() {
//   return (
//     <Router>
//       <Header />
//       <Routes>
//         <Route path="/profileview" element={<ProfileView />} />
//         <Route path="/matchmaking" element={<MatchMakingView />} />
//         <Route path="/chat" element={<ChatView />} />
//         <Route path="/swipe" element={<SwipeCards />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
