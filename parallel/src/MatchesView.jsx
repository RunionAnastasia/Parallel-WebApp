// import React, { useState, useEffect } from "react";
// import { doc, getDoc } from "firebase/firestore";
// import { db, auth } from "./firebase"; // Firestore and auth instance
// import "./styles/MatchesView.css";

// const MatchesView = () => {
//   const [matches, setMatches] = useState([]);
//   const currentUserId = auth.currentUser?.uid;

//   useEffect(() => {
//     const fetchMatches = async () => {
//       try {
//         // Fetch the current user's document
//         const userDocRef = doc(db, "people", currentUserId);
//         const userDocSnap = await getDoc(userDocRef);

//         if (userDocSnap.exists()) {
//           const userData = userDocSnap.data();
//           const matchedUserIds = userData.matches || [];

//           // Fetch data for each matched user
//           const matchDataPromises = matchedUserIds.map(async (userId) => {
//             const matchDocRef = doc(db, "people", userId);
//             const matchDocSnap = await getDoc(matchDocRef);
//             if (matchDocSnap.exists()) {
//               return { id: matchDocSnap.id, ...matchDocSnap.data() };
//             }
//             return null;
//           });

//           const matchesData = (await Promise.all(matchDataPromises)).filter(Boolean);
//           setMatches(matchesData);
//         } else {
//           console.error("User document does not exist.");
//         }
//       } catch (error) {
//         console.error("Error fetching matches:", error);
//       }
//     };

//     if (currentUserId) {
//       fetchMatches();
//     }
//   }, [currentUserId]);

//   if (matches.length === 0) {
//     return (
//       <div className="matches-container">
//         <h1>No Matches Found</h1>
//       </div>
//     );
//   }

//   return (
//     <div className="matches-container">
//       <h1>Your Matches</h1>
//       <div className="matches-list">
//         {matches.map((match) => (
//           <div key={match.id} className="match-card">
//             <img
//               src={match.profileImages?.[0] || "https://via.placeholder.com/150"}
//               alt={match.name}
//               className="match-photo"
//             />
//             <h2>{match.name}</h2>
//             <p><strong>Bio:</strong> {match.bio || "No bio available."}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MatchesView;



import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "./firebase"; // Firestore and auth instance
import "./styles/MatchesView.css";

const MatchesView = () => {
  const [matches, setMatches] = useState([]);
  const currentUserId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        if (!currentUserId) {
          console.error("User is not logged in.");
          return;
        }

        // Fetch the current user's document
        const userDocRef = doc(db, "people", currentUserId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const matchedUserIds = userData.matches || [];

          // Fetch data for each matched user
          const matchDataPromises = matchedUserIds.map(async (userId) => {
            const matchDocRef = doc(db, "people", userId);
            const matchDocSnap = await getDoc(matchDocRef);
            if (matchDocSnap.exists()) {
              return { id: matchDocSnap.id, ...matchDocSnap.data() };
            }
            return null;
          });

          const matchesData = (await Promise.all(matchDataPromises)).filter(Boolean);
          setMatches(matchesData);
        } else {
          console.error("User document does not exist.");
        }
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches();
  }, [currentUserId]);

  if (matches.length === 0) {
    return (
      <div className="matches-container">
        <h1>No Matches Found</h1>
      </div>
    );
  }

  return (
    <div className="matches-container">
      <h1>Your Matches</h1>
      <div className="matches-list">
        {matches.map((match) => (
          <div key={match.id} className="match-card">
            <img
              src={match.profileImages?.[0] || "https://via.placeholder.com/150"}
              alt={match.name}
              className="match-photo"
            />
            <h2>{match.name}</h2>
            <p><strong>Bio:</strong> {match.bio || "No bio available."}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchesView;
