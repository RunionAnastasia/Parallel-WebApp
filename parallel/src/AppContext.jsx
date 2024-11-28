// import React, { createContext, useState } from "react";

// // Create the context
// export const AppContext = createContext();

// // Context Provider
// export const AppProvider = ({ children }) => {
//   const [likedProfiles, setLikedProfiles] = useState([]); // Store liked profiles
//   const [viewedProfiles, setViewedProfiles] = useState([]); // Track viewed profiles

//   return (
//     <AppContext.Provider
//       value={{
//         likedProfiles,
//         setLikedProfiles,
//         viewedProfiles,
//         setViewedProfiles,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };


import React, { createContext, useState, useEffect } from "react";
import { auth } from "./firebase"; // Import Firebase auth

// Create the context
export const AppContext = createContext();

// Context Provider
export const AppProvider = ({ children }) => {
  const [likedProfiles, setLikedProfiles] = useState([]); // Store liked profiles
  const [viewedProfiles, setViewedProfiles] = useState([]); // Track viewed profiles
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user); // Update login state
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  return (
    <AppContext.Provider
      value={{
        likedProfiles,
        setLikedProfiles,
        viewedProfiles,
        setViewedProfiles,
        isLoggedIn, // Provide login status to all components
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
