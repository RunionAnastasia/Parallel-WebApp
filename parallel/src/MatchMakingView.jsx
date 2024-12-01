// import React, { useState, useContext, useEffect } from "react";
// import { AppContext } from "./AppContext"; // Import the context
// import "./styles/MatchmakingView.css";

// const MatchmakingView = () => {
//   const { likedProfiles, setLikedProfiles, viewedProfiles, setViewedProfiles } =
//     useContext(AppContext); // Access context

//   const [matches] = useState([
//     {
//       id: 1,
//       name: "Alice",
//       photo: "/alice.jpg",
//       interests: ["Music", "Traveling"],
//       bio: "I love exploring new places and meeting new people. Let's create memories together!",
//     },
//     {
//       id: 2,
//       name: "Bob",
//       photo: "/bob.jpg",
//       interests: ["Gaming", "Cooking"],
//       bio: "A gamer and food enthusiast. If you enjoy fun and good food, we might be a match!",
//     },
//     {
//       id: 3,
//       name: "Charlie",
//       photo: "/charlie.jpg",
//       interests: ["Sports", "Reading"],
//       bio: "A sports lover who also enjoys a good book. Let's chat and share stories!",
//     },
//   ]);

//   const [currentMatchId, setCurrentMatchId] = useState(null); // Track the current profile by ID

//   // Filter matches to exclude viewed profiles
//   const unviewedMatches = matches.filter(
//     (match) => !viewedProfiles.some((viewed) => viewed.id === match.id)
//   );

//   // Sync currentMatchId with unviewedMatches
//   useEffect(() => {
//     if (unviewedMatches.length > 0) {
//       // If no currentMatchId, set to the first unviewed match
//       if (!currentMatchId || !unviewedMatches.some((match) => match.id === currentMatchId)) {
//         setCurrentMatchId(unviewedMatches[0].id);
//       }
//     }
//   }, [unviewedMatches, currentMatchId]);

//   // Handle Like Button Click
//   const handleLike = () => {
//     const currentMatch = unviewedMatches.find((match) => match.id === currentMatchId);
//     setLikedProfiles((prev) => [...prev, currentMatch]); // Add to liked profiles
//     handleProfileViewed(currentMatch); // Mark profile as viewed
//   };

//   // Handle Dislike Button Click
//   const handleDislike = () => {
//     const currentMatch = unviewedMatches.find((match) => match.id === currentMatchId);
//     handleProfileViewed(currentMatch); // Mark profile as viewed
//   };

//   // Mark Profile as Viewed (on Like or Dislike)
//   const handleProfileViewed = (profile) => {
//     setViewedProfiles((prev) => [...prev, profile]); // Add profile to viewedProfiles
//     showNextProfile();
//   };

//   // Show the Next Profile
//   const showNextProfile = () => {
//     const currentIndex = unviewedMatches.findIndex((match) => match.id === currentMatchId);
//     if (currentIndex < unviewedMatches.length - 1) {
//       setCurrentMatchId(unviewedMatches[currentIndex + 1].id);
//     } else {
//       setCurrentMatchId(null); // No more profiles to show
//     }
//   };

//   // Handle case where no profiles are left
//   if (unviewedMatches.length === 0) {
//     return (
//       <div className="matchmaking-container">
//         <h1>No more matches available!</h1>
//       </div>
//     );
//   }

//   const currentMatch = unviewedMatches.find((match) => match.id === currentMatchId);

//   return (
//     <div className="matchmaking-container">
//       <h1>Find Your Match</h1>
//       {currentMatch && (
//         <div className="match-profile-card">
//           <img
//             src={currentMatch.photo}
//             alt={currentMatch.name}
//             className="match-photo"
//           />
//           <h2>{currentMatch.name}</h2>
//           <p><strong>Bio:</strong> {currentMatch.bio}</p>
//           <p><strong>Interests:</strong> {currentMatch.interests.join(", ")}</p>
//         </div>
//       )}
//       <div className="button-container">
//         <button className="dislike-button" onClick={handleDislike}>
//           Dislike
//         </button>
//         <button className="like-button" onClick={handleLike}>
//           Like
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MatchmakingView;


// import React, { useState, useContext, useEffect } from "react";
// import { AppContext } from "./AppContext"; // Import the context
// import "./styles/MatchmakingView.css";
// import { collection, getDocs } from "firebase/firestore"; // Import Firestore functions
// import { db, auth } from "./firebase"; // Import the Firestore and auth instances

// const MatchmakingView = () => {
//   const { likedProfiles, setLikedProfiles, viewedProfiles, setViewedProfiles } =
//     useContext(AppContext); // Access context

//   const [matches, setMatches] = useState([]); // State for matches
//   const [currentMatchId, setCurrentMatchId] = useState(null); // Track the current profile by ID
//   const currentUserId = auth.currentUser?.uid; // Get the current user's ID

//   // Fetch matches from Firestore
//   useEffect(() => {
//     const fetchMatches = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "people")); // Get all documents in "people"
//         const peopleData = querySnapshot.docs
//           .map((doc) => ({
//             id: doc.id, // Use document ID as unique identifier
//             ...doc.data(), // Spread document fields (name, url, etc.)
//           }))
//           .filter((person) => person.userId !== currentUserId); // Exclude the current user

//         setMatches(peopleData); // Set matches state with fetched data
//       } catch (error) {
//         console.error("Error fetching matches:", error);
//       }
//     };

//     fetchMatches(); // Call the function
//   }, [currentUserId]);

//   // Filter matches to exclude viewed profiles
//   const unviewedMatches = matches.filter(
//     (match) => !viewedProfiles.some((viewed) => viewed.id === match.id)
//   );

//   // Sync currentMatchId with unviewedMatches
//   useEffect(() => {
//     if (unviewedMatches.length > 0) {
//       // If no currentMatchId, set to the first unviewed match
//       if (!currentMatchId || !unviewedMatches.some((match) => match.id === currentMatchId)) {
//         setCurrentMatchId(unviewedMatches[0].id);
//       }
//     }
//   }, [unviewedMatches, currentMatchId]);

//   // Handle Like Button Click
//   const handleLike = () => {
//     const currentMatch = unviewedMatches.find((match) => match.id === currentMatchId);
//     setLikedProfiles((prev) => [...prev, currentMatch]); // Add to liked profiles
//     handleProfileViewed(currentMatch); // Mark profile as viewed
//   };

//   // Handle Dislike Button Click
//   const handleDislike = () => {
//     const currentMatch = unviewedMatches.find((match) => match.id === currentMatchId);
//     handleProfileViewed(currentMatch); // Mark profile as viewed
//   };

//   // Mark Profile as Viewed (on Like or Dislike)
//   const handleProfileViewed = (profile) => {
//     setViewedProfiles((prev) => [...prev, profile]); // Add profile to viewedProfiles
//     showNextProfile();
//   };

//   // Show the Next Profile
//   const showNextProfile = () => {
//     const currentIndex = unviewedMatches.findIndex((match) => match.id === currentMatchId);
//     if (currentIndex < unviewedMatches.length - 1) {
//       setCurrentMatchId(unviewedMatches[currentIndex + 1].id);
//     } else {
//       setCurrentMatchId(null); // No more profiles to show
//     }
//   };

//   // Handle case where no profiles are left
//   if (unviewedMatches.length === 0) {
//     return (
//       <div className="matchmaking-container">
//         <h1>No more matches available!</h1>
//       </div>
//     );
//   }

//   const currentMatch = unviewedMatches.find((match) => match.id === currentMatchId);

//   return (
//     <div className="matchmaking-container">
//       <h1>Find Your Match</h1>
//       {currentMatch && (
//         <div className="match-profile-card">
//           <img
//             src={currentMatch.url} // Use Firestore's "url" field
//             alt={currentMatch.name}
//             className="match-photo"
//           />
//           <h2>{currentMatch.name}</h2>
//           <p>
//             <strong>Bio:</strong> {currentMatch.bio || "No bio available."}
//           </p>
//           <p>
//             <strong>Interests:</strong>{" "}
//             {currentMatch.interests?.join(", ") || "No interests listed."}
//           </p>
//         </div>
//       )}
//       <div className="button-container">
//         <button className="dislike-button" onClick={handleDislike}>
//           Dislike
//         </button>
//         <button className="like-button" onClick={handleLike}>
//           Like
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MatchmakingView;


// import React, { useState, useContext, useEffect } from "react";
// import { AppContext } from "./AppContext"; // Import the context
// import "./styles/MatchmakingView.css";
// import { collection, getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore"; // Firestore functions
// import { db, auth } from "./firebase"; // Firestore and auth instances

// const MatchmakingView = () => {
//   const { likedProfiles, setLikedProfiles, viewedProfiles, setViewedProfiles } =
//     useContext(AppContext); // Access context

//   const [matches, setMatches] = useState([]); // State for matches
//   const [currentMatchId, setCurrentMatchId] = useState(null); // Track the current profile by ID
//   const currentUserId = auth.currentUser?.uid; // Get the current user's ID

//   // Fetch matches from Firestore
//   useEffect(() => {
//     const fetchMatches = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "people")); // Get all documents in "people"
//         const peopleData = querySnapshot.docs
//           .map((doc) => ({
//             id: doc.id, // Use document ID as unique identifier
//             ...doc.data(), // Spread document fields (name, url, etc.)
//           }))
//           .filter((person) => person.userId !== currentUserId); // Exclude the current user

//         setMatches(peopleData); // Set matches state with fetched data
//       } catch (error) {
//         console.error("Error fetching matches:", error);
//       }
//     };

//     fetchMatches(); // Call the function
//   }, [currentUserId]);

//   // Filter matches to exclude viewed profiles
//   const unviewedMatches = matches.filter(
//     (match) => !viewedProfiles.some((viewed) => viewed.id === match.id)
//   );

//   // Sync currentMatchId with unviewedMatches
//   useEffect(() => {
//     if (unviewedMatches.length > 0) {
//       // If no currentMatchId, set to the first unviewed match
//       if (!currentMatchId || !unviewedMatches.some((match) => match.id === currentMatchId)) {
//         setCurrentMatchId(unviewedMatches[0].id);
//       }
//     }
//   }, [unviewedMatches, currentMatchId]);

//   // Handle Like Button Click
//   const handleLike = async () => {
//     const currentMatch = unviewedMatches.find((match) => match.id === currentMatchId);
//     if (!currentMatch) return;

//     try {
//       // Add the current match to likedProfiles
//       setLikedProfiles((prev) => [...prev, currentMatch]);
      
//       // Save the like in Firestore (current user's likedProfiles)
//       const userDocRef = doc(db, "people", currentUserId);
//       await updateDoc(userDocRef, {
//         likedProfiles: arrayUnion(currentMatch.userId),
//       });

//       // Check if mutual like exists
//       const matchDocRef = doc(db, "people", currentMatch.id);
//       const matchDoc = await getDoc(matchDocRef);
//       if (matchDoc.exists() && matchDoc.data().likedProfiles?.includes(currentUserId)) {
//         // Save the match for both users
//         await updateDoc(userDocRef, {
//           matches: arrayUnion(currentMatch.userId),
//         });
//         await updateDoc(matchDocRef, {
//           matches: arrayUnion(currentUserId),
//         });
//         console.log("It's a match!");
//       }
//     } catch (error) {
//       console.error("Error handling like:", error);
//     }

//     handleProfileViewed(currentMatch); // Mark profile as viewed
//   };

//   // Handle Dislike Button Click
//   const handleDislike = () => {
//     const currentMatch = unviewedMatches.find((match) => match.id === currentMatchId);
//     handleProfileViewed(currentMatch); // Mark profile as viewed
//   };

//   // Mark Profile as Viewed (on Like or Dislike)
//   const handleProfileViewed = (profile) => {
//     setViewedProfiles((prev) => [...prev, profile]); // Add profile to viewedProfiles
//     showNextProfile();
//   };

//   // Show the Next Profile
//   const showNextProfile = () => {
//     const currentIndex = unviewedMatches.findIndex((match) => match.id === currentMatchId);
//     if (currentIndex < unviewedMatches.length - 1) {
//       setCurrentMatchId(unviewedMatches[currentIndex + 1].id);
//     } else {
//       setCurrentMatchId(null); // No more profiles to show
//     }
//   };

//   // Handle case where no profiles are left
//   if (unviewedMatches.length === 0) {
//     return (
//       <div className="matchmaking-container">
//         <h1>No more matches available!</h1>
//       </div>
//     );
//   }

//   const currentMatch = unviewedMatches.find((match) => match.id === currentMatchId);

//   return (
//     <div className="matchmaking-container">
//       <h1>Find Your Match</h1>
//       {currentMatch && (
//         <div className="match-profile-card">
//           <img
//             src={currentMatch.url} // Use Firestore's "url" field
//             alt={currentMatch.name}
//             className="match-photo"
//           />
//           <h2>{currentMatch.name}</h2>
//           <p>
//             <strong>Bio:</strong> {currentMatch.bio || "No bio available."}
//           </p>
//           <p>
//             <strong>Interests:</strong>{" "}
//             {currentMatch.interests?.join(", ") || "No interests listed."}
//           </p>
//         </div>
//       )}
//       <div className="button-container">
//         <button className="dislike-button" onClick={handleDislike}>
//           Dislike
//         </button>
//         <button className="like-button" onClick={handleLike}>
//           Like
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MatchmakingView;




//CURRENT  - will show all profiles even matched 
// import React, { useState, useContext, useEffect } from "react";
// import { AppContext } from "./AppContext"; // Import the context
// import "./styles/MatchmakingView.css";
// import {
//   collection,
//   getDocs,
//   doc,
//   getDoc,
//   updateDoc,
//   arrayUnion,
// } from "firebase/firestore"; // Firestore functions
// import { db, auth } from "./firebase"; // Firestore and auth instances

// const MatchmakingView = () => {
//   const { likedProfiles, setLikedProfiles, viewedProfiles, setViewedProfiles } =
//     useContext(AppContext); // Access context

//   const [matches, setMatches] = useState([]); // State for matches
//   const [currentMatchId, setCurrentMatchId] = useState(null); // Track the current profile by ID
//   const currentUserId = auth.currentUser?.uid; // Get the current user's ID

//   // Fetch matches from Firestore
//   useEffect(() => {
//     const fetchMatches = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "people")); // Get all documents in "people"
//         const peopleData = querySnapshot.docs
//           .map((doc) => ({
//             id: doc.id, // Use document ID as unique identifier
//             ...doc.data(), // Spread document fields (name, url, etc.)
//           }))
//           .filter((person) => person.userId !== currentUserId); // Exclude the current user

//         setMatches(peopleData); // Set matches state with fetched data
//       } catch (error) {
//         console.error("Error fetching matches:", error);
//       }
//     };

//     fetchMatches(); // Call the function
//   }, [currentUserId]);

//   // Filter matches to exclude viewed profiles
//   const unviewedMatches = matches.filter(
//     (match) => !viewedProfiles.some((viewed) => viewed.id === match.id)
//   );

//   // Sync currentMatchId with unviewedMatches
//   useEffect(() => {
//     if (unviewedMatches.length > 0) {
//       // If no currentMatchId, set to the first unviewed match
//       if (
//         !currentMatchId ||
//         !unviewedMatches.some((match) => match.id === currentMatchId)
//       ) {
//         setCurrentMatchId(unviewedMatches[0].id);
//       }
//     }
//   }, [unviewedMatches, currentMatchId]);

//   // Handle Like Button Click
//   const handleLike = async () => {
//     const currentMatch = unviewedMatches.find(
//       (match) => match.id === currentMatchId
//     );
//     if (!currentMatch) return;

//     try {
//       // Add the current match to likedProfiles
//       setLikedProfiles((prev) => [...prev, currentMatch]);

//       // Save the like in Firestore (current user's likedProfiles)
//       const userDocRef = doc(db, "people", currentUserId);
//       await updateDoc(userDocRef, {
//         likedProfiles: arrayUnion(currentMatch.userId),
//       });

//       // Check if mutual like exists
//       const matchDocRef = doc(db, "people", currentMatch.id);
//       const matchDoc = await getDoc(matchDocRef);
//       if (matchDoc.exists() && matchDoc.data().likedProfiles?.includes(currentUserId)) {
//         // Save the match for both users
//         await updateDoc(userDocRef, {
//           matches: arrayUnion(currentMatch.userId),
//         });
//         await updateDoc(matchDocRef, {
//           matches: arrayUnion(currentUserId),
//         });
//         console.log("It's a match!");
//       }
//     } catch (error) {
//       console.error("Error handling like:", error);
//     }

//     handleProfileViewed(currentMatch); // Mark profile as viewed
//   };

//   // Handle Dislike Button Click
//   const handleDislike = () => {
//     const currentMatch = unviewedMatches.find(
//       (match) => match.id === currentMatchId
//     );
//     handleProfileViewed(currentMatch); // Mark profile as viewed
//   };

//   // Mark Profile as Viewed (on Like or Dislike)
//   const handleProfileViewed = (profile) => {
//     setViewedProfiles((prev) => [...prev, profile]); // Add profile to viewedProfiles
//     showNextProfile();
//   };

//   // Show the Next Profile
//   const showNextProfile = () => {
//     const currentIndex = unviewedMatches.findIndex(
//       (match) => match.id === currentMatchId
//     );
//     if (currentIndex < unviewedMatches.length - 1) {
//       setCurrentMatchId(unviewedMatches[currentIndex + 1].id);
//     } else {
//       setCurrentMatchId(null); // No more profiles to show
//     }
//   };

//   // Handle case where no profiles are left
//   if (unviewedMatches.length === 0) {
//     return (
//       <div className="matchmaking-container">
//         <h1>No more matches available!</h1>
//       </div>
//     );
//   }

//   const currentMatch = unviewedMatches.find(
//     (match) => match.id === currentMatchId
//   );

//   return (
//     <div className="matchmaking-container">
//       <h1>Find Your Match</h1>
//       {currentMatch && (
//         <div className="match-profile-card">
//           <img
//             src={currentMatch.url} // Use Firestore's "url" field
//             alt={currentMatch.name}
//             className="match-photo"
//           />
//           <h2>{currentMatch.name}</h2>
//           <p>
//             <strong>Bio:</strong> {currentMatch.bio || "No bio available."}
//           </p>
//           <p>
//             <strong>Interests:</strong>{" "}
//             {currentMatch.interests?.join(", ") || "No interests listed."}
//           </p>
//         </div>
//       )}
//       <div className="button-container">
//         <button className="dislike-button" onClick={handleDislike}>
//           Dislike
//         </button>
//         <button className="like-button" onClick={handleLike}>
//           Like
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MatchmakingView;


//new 


///doesnt show matched and viewed profiles but affects other accounts i think 
// import React, { useState, useContext, useEffect } from "react";
// import { AppContext } from "./AppContext";
// import {
//   collection,
//   getDocs,
//   doc,
//   getDoc,
//   updateDoc,
//   arrayUnion,
//   Timestamp,
// } from "firebase/firestore";
// import { db, auth } from "./firebase";
// import "./styles/MatchmakingView.css";

// const MatchmakingView = () => {
//   const { likedProfiles, setLikedProfiles, viewedProfiles, setViewedProfiles } =
//     useContext(AppContext);

//   const [matches, setMatches] = useState([]);
//   const [currentMatchId, setCurrentMatchId] = useState(null);
//   const currentUserId = auth.currentUser?.uid;

//   useEffect(() => {
//     const fetchMatches = async () => {
//       try {
//         const userDocRef = doc(db, "people", currentUserId);
//         const userDocSnap = await getDoc(userDocRef);

//         if (userDocSnap.exists()) {
//           const userData = userDocSnap.data();

//           // Fetch profiles excluding matched profiles and handle viewed/rotation logic
//           const querySnapshot = await getDocs(collection(db, "people"));
//           const peopleData = querySnapshot.docs
//             .map((doc) => ({
//               id: doc.id,
//               ...doc.data(),
//             }))
//             .filter((person) => person.userId !== currentUserId) // Exclude current user
//             .filter(
//               (person) =>
//                 !(userData.matches || []).includes(person.userId) && // Exclude matched profiles
//                 !isProfileInRotation(person, userData.viewedProfiles || []) // Exclude profiles not ready for rotation
//             );

//           setMatches(peopleData);
//         }
//       } catch (error) {
//         console.error("Error fetching matches:", error);
//       }
//     };

//     fetchMatches();
//   }, [currentUserId]);

//   // Filter matches to exclude already viewed profiles
//   const unviewedMatches = matches.filter(
//     (match) => !viewedProfiles.some((viewed) => viewed.id === match.id)
//   );

//   // Automatically set the first unviewed profile
//   useEffect(() => {
//     if (unviewedMatches.length > 0 && !currentMatchId) {
//       setCurrentMatchId(unviewedMatches[0].id);
//     }
//   }, [unviewedMatches, currentMatchId]);

//   // Handle like button
//   const handleLike = async () => {
//     const currentMatch = unviewedMatches.find(
//       (match) => match.id === currentMatchId
//     );
//     if (!currentMatch) return;

//     try {
//       setLikedProfiles((prev) => [...prev, currentMatch]);

//       const userDocRef = doc(db, "people", currentUserId);
//       await updateDoc(userDocRef, {
//         likedProfiles: arrayUnion(currentMatch.userId),
//       });

//       const matchDocRef = doc(db, "people", currentMatch.id);
//       const matchDoc = await getDoc(matchDocRef);

//       if (matchDoc.exists() && matchDoc.data().likedProfiles?.includes(currentUserId)) {
//         // Add mutual match for both users
//         await updateDoc(userDocRef, {
//           matches: arrayUnion(currentMatch.userId),
//         });
//         await updateDoc(matchDocRef, {
//           matches: arrayUnion(currentUserId),
//         });
//         console.log("It's a match!");
//       }
//     } catch (error) {
//       console.error("Error handling like:", error);
//     }

//     handleProfileViewed(currentMatch);
//   };

//   // Handle dislike button
//   const handleDislike = () => {
//     const currentMatch = unviewedMatches.find(
//       (match) => match.id === currentMatchId
//     );
//     handleProfileViewed(currentMatch);
//   };

//   // Mark profile as viewed
//   const handleProfileViewed = async (profile) => {
//     setViewedProfiles((prev) => [...prev, profile]);
//     showNextProfile();

//     try {
//       const userDocRef = doc(db, "people", currentUserId);
//       await updateDoc(userDocRef, {
//         viewedProfiles: arrayUnion({
//           userId: profile.userId,
//           timestamp: Timestamp.now(),
//         }),
//       });
//     } catch (error) {
//       console.error("Error updating viewed profiles:", error);
//     }
//   };

//   // Show next profile
//   const showNextProfile = () => {
//     const currentIndex = unviewedMatches.findIndex(
//       (match) => match.id === currentMatchId
//     );
//     if (currentIndex < unviewedMatches.length - 1) {
//       setCurrentMatchId(unviewedMatches[currentIndex + 1].id);
//     } else {
//       setCurrentMatchId(null);
//     }
//   };

//   // Check if profile is ready for rotation
//   const isProfileInRotation = (profile, viewedProfiles) => {
//     const viewedProfile = viewedProfiles.find(
//       (viewed) => viewed.userId === profile.userId
//     );
//     if (!viewedProfile) return false;

//     const lastViewed = viewedProfile.timestamp.toDate();
//     const thirtyDaysAgo = new Date();
//     thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

//     return lastViewed >= thirtyDaysAgo;
//   };

//   if (unviewedMatches.length === 0) {
//     return (
//       <div className="matchmaking-container">
//         <h1>No more matches available!</h1>
//       </div>
//     );
//   }

//   const currentMatch = unviewedMatches.find(
//     (match) => match.id === currentMatchId
//   );

//   return (
//     <div className="matchmaking-container">
//       <h1>Find Your Match</h1>
//       {currentMatch && (
//         <div className="match-profile-card">
//           <img
//             src={currentMatch.url}
//             alt={currentMatch.name}
//             className="match-photo"
//           />
//           <h2>{currentMatch.name}</h2>
//           <p>
//             <strong>Bio:</strong> {currentMatch.bio || "No bio available."}
//           </p>
//           <p>
//             <strong>Interests:</strong>{" "}
//             {currentMatch.interests?.join(", ") || "No interests listed."}
//           </p>
//           <p>
//             <strong>Location:</strong>{" "}
//             {currentMatch.location
//               ? `${currentMatch.location.latitude}, ${currentMatch.location.longitude}`
//               : "Location not available."}
//           </p>
//         </div>
//       )}
//       <div className="button-container">
//         <button className="dislike-button" onClick={handleDislike}>
//           Dislike
//         </button>
//         <button className="like-button" onClick={handleLike}>
//           Like
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MatchmakingView;







// import React, { useState, useContext, useEffect } from "react";
// import { AppContext } from "./AppContext";
// import {
//   collection,
//   getDocs,
//   doc,
//   getDoc,
//   updateDoc,
//   arrayUnion,
//   Timestamp,
// } from "firebase/firestore";
// import { db, auth } from "./firebase";
// import "./styles/MatchmakingView.css";

// const MatchmakingView = () => {
//   const { likedProfiles, setLikedProfiles, viewedProfiles, setViewedProfiles } =
//     useContext(AppContext);

//   const [matches, setMatches] = useState([]);
//   const [currentMatchId, setCurrentMatchId] = useState(null);
//   const currentUserId = auth.currentUser?.uid;

//   useEffect(() => {
//     const fetchMatches = async () => {
//       try {
//         const userDocRef = doc(db, "people", currentUserId);
//         const userDocSnap = await getDoc(userDocRef);

//         if (userDocSnap.exists()) {
//           const userData = userDocSnap.data();
//           const userDislikedProfiles = userData.dislikedProfiles || [];

//           // Fetch profiles excluding matched and disliked profiles
//           const querySnapshot = await getDocs(collection(db, "people"));
//           const peopleData = querySnapshot.docs
//             .map((doc) => ({
//               id: doc.id,
//               ...doc.data(),
//             }))
//             .filter(
//               (person) =>
//                 person.userId !== currentUserId && // Exclude the current user
//                 !(userData.matches || []).includes(person.userId) && // Exclude matched profiles
//                 !userDislikedProfiles.includes(person.userId) && // Exclude disliked profiles
//                 !isProfileInRotation(person, userData.viewedProfiles || []) // Exclude profiles not ready for rotation
//             );

//           setMatches(peopleData);
//         }
//       } catch (error) {
//         console.error("Error fetching matches:", error);
//       }
//     };

//     fetchMatches();
//   }, [currentUserId]);

//   const unviewedMatches = matches.filter(
//     (match) => !viewedProfiles.some((viewed) => viewed.id === match.id)
//   );

//   useEffect(() => {
//     if (unviewedMatches.length > 0 && !currentMatchId) {
//       setCurrentMatchId(unviewedMatches[0].id);
//     }
//   }, [unviewedMatches, currentMatchId]);

//   const handleLike = async () => {
//     const currentMatch = unviewedMatches.find(
//       (match) => match.id === currentMatchId
//     );
//     if (!currentMatch) return;

//     try {
//       setLikedProfiles((prev) => [...prev, currentMatch]);

//       const userDocRef = doc(db, "people", currentUserId);
//       await updateDoc(userDocRef, {
//         likedProfiles: arrayUnion(currentMatch.userId),
//       });

//       const matchDocRef = doc(db, "people", currentMatch.id);
//       const matchDoc = await getDoc(matchDocRef);

//       if (matchDoc.exists() && matchDoc.data().likedProfiles?.includes(currentUserId)) {
//         await updateDoc(userDocRef, {
//           matches: arrayUnion(currentMatch.userId),
//         });
//         await updateDoc(matchDocRef, {
//           matches: arrayUnion(currentUserId),
//         });
//         console.log("It's a match!");
//       }
//     } catch (error) {
//       console.error("Error handling like:", error);
//     }

//     handleProfileViewed(currentMatch);
//   };

//   const handleDislike = async () => {
//     const currentMatch = unviewedMatches.find(
//       (match) => match.id === currentMatchId
//     );
//     if (!currentMatch) return;

//     try {
//       const userDocRef = doc(db, "people", currentUserId);
//       await updateDoc(userDocRef, {
//         dislikedProfiles: arrayUnion(currentMatch.userId),
//       });
//     } catch (error) {
//       console.error("Error updating disliked profiles:", error);
//     }

//     handleProfileViewed(currentMatch);
//   };

//   const handleProfileViewed = async (profile) => {
//     setViewedProfiles((prev) => [...prev, profile]);
//     showNextProfile();

//     try {
//       const userDocRef = doc(db, "people", currentUserId);
//       await updateDoc(userDocRef, {
//         viewedProfiles: arrayUnion({
//           userId: profile.userId,
//           timestamp: Timestamp.now(),
//         }),
//       });
//     } catch (error) {
//       console.error("Error updating viewed profiles:", error);
//     }
//   };

//   const showNextProfile = () => {
//     const currentIndex = unviewedMatches.findIndex(
//       (match) => match.id === currentMatchId
//     );
//     if (currentIndex < unviewedMatches.length - 1) {
//       setCurrentMatchId(unviewedMatches[currentIndex + 1].id);
//     } else {
//       setCurrentMatchId(null);
//     }
//   };

//   const isProfileInRotation = (profile, viewedProfiles) => {
//     const viewedProfile = viewedProfiles.find(
//       (viewed) => viewed.userId === profile.userId
//     );
//     if (!viewedProfile) return false;

//     const lastViewed = viewedProfile.timestamp.toDate();
//     const thirtyDaysAgo = new Date();
//     thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

//     return lastViewed >= thirtyDaysAgo;
//   };

//   if (unviewedMatches.length === 0) {
//     return (
//       <div className="matchmaking-container">
//         <h1>No more matches available!</h1>
//       </div>
//     );
//   }

//   const currentMatch = unviewedMatches.find(
//     (match) => match.id === currentMatchId
//   );

//   return (
//     <div className="matchmaking-container">
//       <h1>Find Your Match</h1>
//       {currentMatch && (
//         <div className="match-profile-card">
//           <img
//             src={currentMatch.url}
//             alt={currentMatch.name}
//             className="match-photo"
//           />
//           <h2>{currentMatch.name}</h2>
//           <p>
//             <strong>Bio:</strong> {currentMatch.bio || "No bio available."}
//           </p>
//           <p>
//             <strong>Interests:</strong>{" "}
//             {currentMatch.interests?.join(", ") || "No interests listed."}
//           </p>
//           <p>
//             <strong>Location:</strong>{" "}
//             {currentMatch.location
//               ? `${currentMatch.location.latitude}, ${currentMatch.location.longitude}`
//               : "Location not available."}
//           </p>
//         </div>
//       )}
//       <div className="button-container">
//         <button className="dislike-button" onClick={handleDislike}>
//           Dislike
//         </button>
//         <button className="like-button" onClick={handleLike}>
//           Like
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MatchmakingView;




//BAD??
// import React, { useState, useContext, useEffect } from "react";
// import { AppContext } from "./AppContext";
// import {
//   collection,
//   getDocs,
//   doc,
//   getDoc,
//   updateDoc,
//   arrayUnion,
//   Timestamp,
// } from "firebase/firestore";
// import { db, auth } from "./firebase";
// import "./styles/MatchMakingView.css";

// const MatchMakingView = () => {
//   const { likedProfiles, setLikedProfiles, viewedProfiles, setViewedProfiles } =
//     useContext(AppContext);

//   const [matches, setMatches] = useState([]);
//   const [currentMatchId, setCurrentMatchId] = useState(null);
//   const [selectedProfile, setSelectedProfile] = useState(null); // Modal profile
//   const [showModal, setShowModal] = useState(false); // Modal visibility
//   const currentUserId = auth.currentUser?.uid;

//   useEffect(() => {
//     const fetchMatches = async () => {
//       try {
//         const userDocRef = doc(db, "people", currentUserId);
//         const userDocSnap = await getDoc(userDocRef);

//         if (userDocSnap.exists()) {
//           const userData = userDocSnap.data();
//           const userDislikedProfiles = userData.dislikedProfiles || [];

//           const querySnapshot = await getDocs(collection(db, "people"));
//           const peopleData = querySnapshot.docs
//             .map((doc) => ({
//               id: doc.id,
//               ...doc.data(),
//             }))
//             .filter(
//               (person) =>
//                 person.userId !== currentUserId &&
//                 !(userData.matches || []).includes(person.userId) &&
//                 !userDislikedProfiles.includes(person.userId) &&
//                 !isProfileInRotation(person, userData.viewedProfiles || [])
//             );

//           setMatches(peopleData);
//         }
//       } catch (error) {
//         console.error("Error fetching matches:", error);
//       }
//     };

//     fetchMatches();
//   }, [currentUserId]);

//   const unviewedMatches = matches.filter(
//     (match) => !viewedProfiles.some((viewed) => viewed.id === match.id)
//   );

//   useEffect(() => {
//     if (unviewedMatches.length > 0 && !currentMatchId) {
//       setCurrentMatchId(unviewedMatches[0].id);
//     }
//   }, [unviewedMatches, currentMatchId]);

//   const handleLike = async () => {
//     const currentMatch = unviewedMatches.find(
//       (match) => match.id === currentMatchId
//     );
//     if (!currentMatch) return;

//     try {
//       setLikedProfiles((prev) => [...prev, currentMatch]);

//       const userDocRef = doc(db, "people", currentUserId);
//       await updateDoc(userDocRef, {
//         likedProfiles: arrayUnion(currentMatch.userId),
//       });

//       const matchDocRef = doc(db, "people", currentMatch.id);
//       const matchDoc = await getDoc(matchDocRef);

//       if (matchDoc.exists() && matchDoc.data().likedProfiles?.includes(currentUserId)) {
//         await updateDoc(userDocRef, {
//           matches: arrayUnion(currentMatch.userId),
//         });
//         await updateDoc(matchDocRef, {
//           matches: arrayUnion(currentUserId),
//         });
//         console.log("It's a match!");
//       }
//     } catch (error) {
//       console.error("Error handling like:", error);
//     }

//     handleProfileViewed(currentMatch);
//   };

//   const handleDislike = async () => {
//     const currentMatch = unviewedMatches.find(
//       (match) => match.id === currentMatchId
//     );
//     if (!currentMatch) return;

//     try {
//       const userDocRef = doc(db, "people", currentUserId);
//       await updateDoc(userDocRef, {
//         dislikedProfiles: arrayUnion(currentMatch.userId),
//       });
//     } catch (error) {
//       console.error("Error updating disliked profiles:", error);
//     }

//     handleProfileViewed(currentMatch);
//   };

//   const handleProfileViewed = async (profile) => {
//     setViewedProfiles((prev) => [...prev, profile]);
//     showNextProfile();

//     try {
//       const userDocRef = doc(db, "people", currentUserId);
//       await updateDoc(userDocRef, {
//         viewedProfiles: arrayUnion({
//           userId: profile.userId,
//           timestamp: Timestamp.now(),
//         }),
//       });
//     } catch (error) {
//       console.error("Error updating viewed profiles:", error);
//     }
//   };

//   const showNextProfile = () => {
//     const currentIndex = unviewedMatches.findIndex(
//       (match) => match.id === currentMatchId
//     );
//     if (currentIndex < unviewedMatches.length - 1) {
//       setCurrentMatchId(unviewedMatches[currentIndex + 1].id);
//     } else {
//       setCurrentMatchId(null);
//     }
//   };

//   const isProfileInRotation = (profile, viewedProfiles) => {
//     const viewedProfile = viewedProfiles.find(
//       (viewed) => viewed.userId === profile.userId
//     );
//     if (!viewedProfile) return false;

//     const lastViewed = viewedProfile.timestamp.toDate();
//     const thirtyDaysAgo = new Date();
//     thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

//     return lastViewed >= thirtyDaysAgo;
//   };

//   const openProfileModal = (profile) => {
//     setSelectedProfile(profile);
//     setShowModal(true);
//   };

//   const closeProfileModal = () => {
//     setSelectedProfile(null);
//     setShowModal(false);
//   };

//   if (unviewedMatches.length === 0) {
//     return (
//       <div className="matchmaking-container">
//         <h1>No more matches available!</h1>
//       </div>
//     );
//   }

//   const currentMatch = unviewedMatches.find(
//     (match) => match.id === currentMatchId
//   );

//   return (
//     <div className="matchmaking-container">
//       <h1>Find Your Match</h1>
//       {currentMatch && (
//         <div
//           className="match-profile-card"
//           onClick={() => openProfileModal(currentMatch)}
//         >
//           <img
//             src={currentMatch.profileImages[0] || "/default-avatar.png"}
//             alt={currentMatch.name}
//             className="match-photo"
//           />
//           <h2>{currentMatch.name}</h2>
//           <p>
//             <strong>Bio:</strong> {currentMatch.bio || "No bio available."}
//           </p>
//           <p>
//             <strong>Interests:</strong>{" "}
//             {currentMatch.interests?.join(", ") || "No interests listed."}
//           </p>
//           <p>
//             <strong>Location:</strong>{" "}
//             {currentMatch.location || "Location not available."}
//           </p>
//         </div>
//       )}
//       <div className="button-container">
//         <button className="dislike-button" onClick={handleDislike}>
//           Dislike
//         </button>
//         <button className="like-button" onClick={handleLike}>
//           Like
//         </button>
//       </div>

//       {showModal && selectedProfile && (
//         <div className="profile-modal">
//           <div className="modal-content">
//             <button className="close-modal" onClick={closeProfileModal}>
//               ✕
//             </button>
//             <img
//               src={selectedProfile.profileImages[0] || "/default-avatar.png"}
//               alt={selectedProfile.name}
//               className="modal-photo"
//             />
//             <h2>{selectedProfile.name}</h2>
//             <p>{selectedProfile.bio || "No bio available."}</p>
//             <div className="modal-photos">
//               {selectedProfile.profileImages.slice(0, 5).map((url, index) => (
//                 <img
//                   key={index}
//                   src={url}
//                   alt={`Profile image ${index + 1}`}
//                   className="additional-photo"
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MatchMakingView;


import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "./AppContext";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  Timestamp,
} from "firebase/firestore";
import { db, auth } from "./firebase";
import "./styles/MatchMakingView.css";

const MatchMakingView = () => {
  const { likedProfiles, setLikedProfiles, viewedProfiles, setViewedProfiles } =
    useContext(AppContext);

  const [matches, setMatches] = useState([]);
  const [currentMatchId, setCurrentMatchId] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null); // For modal
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const currentUserId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const userDocRef = doc(db, "people", currentUserId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const userDislikedProfiles = userData.dislikedProfiles || [];

          const querySnapshot = await getDocs(collection(db, "people"));
          const peopleData = querySnapshot.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            .filter(
              (person) =>
                person.userId !== currentUserId &&
                !(userData.matches || []).includes(person.userId) &&
                !userDislikedProfiles.includes(person.userId) &&
                !isProfileInRotation(person, userData.viewedProfiles || [])
            );

          setMatches(peopleData);
        }
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches();
  }, [currentUserId]);

  const unviewedMatches = matches.filter(
    (match) => !viewedProfiles.some((viewed) => viewed.id === match.id)
  );

  useEffect(() => {
    if (unviewedMatches.length > 0 && !currentMatchId) {
      setCurrentMatchId(unviewedMatches[0].id);
    }
  }, [unviewedMatches, currentMatchId]);

  const handleLike = async () => {
    const currentMatch = unviewedMatches.find(
      (match) => match.id === currentMatchId
    );
    if (!currentMatch) return;

    try {
      setLikedProfiles((prev) => [...prev, currentMatch]);

      const userDocRef = doc(db, "people", currentUserId);
      await updateDoc(userDocRef, {
        likedProfiles: arrayUnion(currentMatch.userId),
      });

      const matchDocRef = doc(db, "people", currentMatch.id);
      const matchDoc = await getDoc(matchDocRef);

      if (matchDoc.exists() && matchDoc.data().likedProfiles?.includes(currentUserId)) {
        await updateDoc(userDocRef, {
          matches: arrayUnion(currentMatch.userId),
        });
        await updateDoc(matchDocRef, {
          matches: arrayUnion(currentUserId),
        });
        console.log("It's a match!");
      }
    } catch (error) {
      console.error("Error handling like:", error);
    }

    handleProfileViewed(currentMatch);
  };

  const handleDislike = async () => {
    const currentMatch = unviewedMatches.find(
      (match) => match.id === currentMatchId
    );
    if (!currentMatch) return;

    try {
      const userDocRef = doc(db, "people", currentUserId);
      await updateDoc(userDocRef, {
        dislikedProfiles: arrayUnion(currentMatch.userId),
      });
    } catch (error) {
      console.error("Error updating disliked profiles:", error);
    }

    handleProfileViewed(currentMatch);
  };

  const handleProfileViewed = async (profile) => {
    setViewedProfiles((prev) => [...prev, profile]);
    showNextProfile();

    try {
      const userDocRef = doc(db, "people", currentUserId);
      await updateDoc(userDocRef, {
        viewedProfiles: arrayUnion({
          userId: profile.userId,
          timestamp: Timestamp.now(),
        }),
      });
    } catch (error) {
      console.error("Error updating viewed profiles:", error);
    }
  };

  const showNextProfile = () => {
    const currentIndex = unviewedMatches.findIndex(
      (match) => match.id === currentMatchId
    );
    if (currentIndex < unviewedMatches.length - 1) {
      setCurrentMatchId(unviewedMatches[currentIndex + 1].id);
    } else {
      setCurrentMatchId(null);
    }
  };

  const isProfileInRotation = (profile, viewedProfiles) => {
    const viewedProfile = viewedProfiles.find(
      (viewed) => viewed.userId === profile.userId
    );
    if (!viewedProfile) return false;

    const lastViewed = viewedProfile.timestamp.toDate();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return lastViewed >= thirtyDaysAgo;
  };

  const openProfileModal = (profile) => {
    setSelectedProfile(profile);
    setShowModal(true);
  };

  const closeProfileModal = () => {
    setSelectedProfile(null);
    setShowModal(false);
  };

  if (unviewedMatches.length === 0) {
    return (
      <div className="matchmaking-container">
        <h1>No more matches available!</h1>
      </div>
    );
  }

  const currentMatch = unviewedMatches.find(
    (match) => match.id === currentMatchId
  );

  return (
    <div className="matchmaking-container">
      <h1>Find Your Match</h1>
      {currentMatch && (
        <div
          className="match-profile-card"
          onClick={() => openProfileModal(currentMatch)}
        >
          <img
            src={currentMatch.url || "/default-avatar.png"}
            alt={currentMatch.name}
            className="match-photo"
          />
          <h2>{currentMatch.name}</h2>
          <p>
            <strong>Bio:</strong> {currentMatch.bio || "No bio available."}
          </p>
          <p>
            <strong>Interests:</strong>{" "}
            {currentMatch.interests?.join(", ") || "No interests listed."}
          </p>
          <p>
            <strong>Location:</strong>{" "}
            {currentMatch.location
              ? `${currentMatch.location.latitude}, ${currentMatch.location.longitude}`
              : "Location not available."}
          </p>
        </div>
      )}
      <div className="button-container">
        <button className="dislike-button" onClick={handleDislike}>
          Dislike
        </button>
        <button className="like-button" onClick={handleLike}>
          Like
        </button>
      </div>

      {showModal && selectedProfile && (
        <div className="profile-modal">
          <div className="modal-content">
            <button className="close-modal" onClick={closeProfileModal}>
              ✕
            </button>
            <img
              src={selectedProfile.profileImages[0] || "/default-avatar.png"}
              alt={selectedProfile.name}
              className="modal-photo"
            />
            <h2>{selectedProfile.name}</h2>
            <p>{selectedProfile.bio || "No bio available."}</p>
            <div className="modal-photos">
              {selectedProfile.profileImages.slice(0, 5).map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Profile image ${index + 1}`}
                  className="additional-photo"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchMakingView;


// import React, { useState, useContext, useEffect } from "react";
// import { AppContext } from "./AppContext";
// import {
//   collection,
//   getDocs,
//   doc,
//   getDoc,
//   updateDoc,
//   arrayUnion,
//   Timestamp,
// } from "firebase/firestore";
// import { db, auth } from "./firebase";
// import "./styles/MatchMakingView.css";

// const MatchMakingView = () => {
//   const { likedProfiles, setLikedProfiles, viewedProfiles, setViewedProfiles } =
//     useContext(AppContext);

//   const [matches, setMatches] = useState([]);
//   const [currentMatchId, setCurrentMatchId] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedProfile, setSelectedProfile] = useState(null);
//   const currentUserId = auth.currentUser?.uid;

//   useEffect(() => {
//     const fetchMatches = async () => {
//       try {
//         const userDocRef = doc(db, "people", currentUserId);
//         const userDocSnap = await getDoc(userDocRef);

//         if (userDocSnap.exists()) {
//           const userData = userDocSnap.data();
//           const userDislikedProfiles = userData.dislikedProfiles || [];

//           // Fetch profiles excluding matched and disliked profiles
//           const querySnapshot = await getDocs(collection(db, "people"));
//           const peopleData = querySnapshot.docs
//             .map((doc) => ({
//               id: doc.id,
//               ...doc.data(),
//             }))
//             .filter(
//               (person) =>
//                 person.userId !== currentUserId && // Exclude the current user
//                 !(userData.matches || []).includes(person.userId) && // Exclude matched profiles
//                 !userDislikedProfiles.includes(person.userId) && // Exclude disliked profiles
//                 !isProfileInRotation(person, userData.viewedProfiles || []) // Exclude profiles not ready for rotation
//             );

//           setMatches(peopleData);
//         }
//       } catch (error) {
//         console.error("Error fetching matches:", error);
//       }
//     };

//     fetchMatches();
//   }, [currentUserId]);

//   const unviewedMatches = matches.filter(
//     (match) => !viewedProfiles.some((viewed) => viewed.id === match.id)
//   );

//   useEffect(() => {
//     if (unviewedMatches.length > 0 && !currentMatchId) {
//       setCurrentMatchId(unviewedMatches[0].id);
//     }
//   }, [unviewedMatches, currentMatchId]);

//   const handleLike = async () => {
//     const currentMatch = unviewedMatches.find(
//       (match) => match.id === currentMatchId
//     );
//     if (!currentMatch) return;

//     try {
//       setLikedProfiles((prev) => [...prev, currentMatch]);

//       const userDocRef = doc(db, "people", currentUserId);
//       await updateDoc(userDocRef, {
//         likedProfiles: arrayUnion(currentMatch.userId),
//       });

//       const matchDocRef = doc(db, "people", currentMatch.id);
//       const matchDoc = await getDoc(matchDocRef);

//       if (matchDoc.exists() && matchDoc.data().likedProfiles?.includes(currentUserId)) {
//         await updateDoc(userDocRef, {
//           matches: arrayUnion(currentMatch.userId),
//         });
//         await updateDoc(matchDocRef, {
//           matches: arrayUnion(currentUserId),
//         });
//         console.log("It's a match!");
//       }
//     } catch (error) {
//       console.error("Error handling like:", error);
//     }

//     handleProfileViewed(currentMatch);
//   };

//   const handleDislike = async () => {
//     const currentMatch = unviewedMatches.find(
//       (match) => match.id === currentMatchId
//     );
//     if (!currentMatch) return;

//     try {
//       const userDocRef = doc(db, "people", currentUserId);
//       await updateDoc(userDocRef, {
//         dislikedProfiles: arrayUnion(currentMatch.userId),
//       });
//     } catch (error) {
//       console.error("Error updating disliked profiles:", error);
//     }

//     handleProfileViewed(currentMatch);
//   };

//   const handleProfileViewed = async (profile) => {
//     setViewedProfiles((prev) => [...prev, profile]);
//     showNextProfile();

//     try {
//       const userDocRef = doc(db, "people", currentUserId);
//       await updateDoc(userDocRef, {
//         viewedProfiles: arrayUnion({
//           userId: profile.userId,
//           timestamp: Timestamp.now(),
//         }),
//       });
//     } catch (error) {
//       console.error("Error updating viewed profiles:", error);
//     }
//   };

//   const showNextProfile = () => {
//     const currentIndex = unviewedMatches.findIndex(
//       (match) => match.id === currentMatchId
//     );
//     if (currentIndex < unviewedMatches.length - 1) {
//       setCurrentMatchId(unviewedMatches[currentIndex + 1].id);
//     } else {
//       setCurrentMatchId(null);
//     }
//   };

//   const isProfileInRotation = (profile, viewedProfiles) => {
//     const viewedProfile = viewedProfiles.find(
//       (viewed) => viewed.userId === profile.userId
//     );
//     if (!viewedProfile) return false;

//     const lastViewed = viewedProfile.timestamp.toDate();
//     const thirtyDaysAgo = new Date();
//     thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

//     return lastViewed >= thirtyDaysAgo;
//   };

//   const openModal = (profile) => {
//     setSelectedProfile(profile);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setSelectedProfile(null);
//     setIsModalOpen(false);
//   };

//   if (unviewedMatches.length === 0) {
//     return (
//       <div className="matchmaking-container">
//         <h1>No more matches available!</h1>
//       </div>
//     );
//   }

//   const currentMatch = unviewedMatches.find(
//     (match) => match.id === currentMatchId
//   );

//   return (
//     <div className="matchmaking-container">
//       <h1>Find Your Match</h1>
//       {currentMatch && (
//         <div className="match-profile-card" onClick={() => openModal(currentMatch)}>
//           <img
//             src={currentMatch.profileImages ? currentMatch.profileImages[0] : ""}
//             alt={currentMatch.name}
//             className="match-photo"
//           />
//           <h2>{currentMatch.name}</h2>
//         </div>
//       )}
//       <div className="button-container">
//         <button className="dislike-button" onClick={handleDislike}>
//           Dislike
//         </button>
//         <button className="like-button" onClick={handleLike}>
//           Like
//         </button>
//       </div>

//       {/* Modal */}
//       {isModalOpen && selectedProfile && (
//         <div className="modal-overlay" onClick={closeModal}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <button className="modal-close" onClick={closeModal}>
//               ×
//             </button>
//             <img
//               src={selectedProfile.profileImages ? selectedProfile.profileImages[0] : ""}
//               alt={selectedProfile.name}
//               className="modal-photo"
//             />
//             <h2>{selectedProfile.name}</h2>
//             <p><strong>Bio:</strong> {selectedProfile.bio || "No bio available."}</p>
//             <p><strong>Interests:</strong> {selectedProfile.interests?.join(", ") || "No interests listed."}</p>
//             <p><strong>Location:</strong> {selectedProfile.location || "No location available."}</p>
//             <Link to={`/profileeditview/${selectedProfile.id}`} className="edit-button">
//               Edit Profile
//             </Link>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MatchMakingView;
