// import React, { useContext, useState } from "react";
// import { AppContext } from "./AppContext"; // Import the context
// import "./styles/ChatView.css";

// const ChatView = () => {
//   const { likedProfiles } = useContext(AppContext); // Access liked profiles
//   const [selectedProfile, setSelectedProfile] = useState(null); // Track the currently selected profile
//   const [messages, setMessages] = useState({}); // Store messages for each profile
//   const [newMessage, setNewMessage] = useState(""); // Track the current input message

//   const handleSendMessage = () => {
//     if (!newMessage.trim()) return; // Prevent sending empty messages

//     // Add the message to the selected profile's message list
//     setMessages((prevMessages) => {
//       const updatedMessages = { ...prevMessages };
//       if (!updatedMessages[selectedProfile.id]) {
//         updatedMessages[selectedProfile.id] = [];
//       }
//       updatedMessages[selectedProfile.id].push(newMessage);
//       return updatedMessages;
//     });

//     setNewMessage(""); // Clear the input field
//   };

//   if (likedProfiles.length === 0) {
//     return (
//       <div className="chat-container">
//         <h1>No Matches Yet</h1>
//         <p>Like someone in Matchmaking to start chatting!</p>
//       </div>
//     );
//   }

//   return (
//     <div className="chat-container">
//       <h1>Your Matches</h1>
//       <div className="chat-list">
//         {likedProfiles.map((profile) => (
//           <div
//             key={profile.id}
//             className={`chat-card ${
//               selectedProfile?.id === profile.id ? "active" : ""
//             }`}
//             onClick={() => setSelectedProfile(profile)} // Set selected profile
//           >
//             <img src={profile.photo} alt={profile.name} className="chat-photo" />
//             <h2>{profile.name}</h2>
//             <p>{profile.bio}</p>
//           </div>
//         ))}
//       </div>

//       {selectedProfile && (
//         <div className="chat-box">
//           <h2>Chat with {selectedProfile.name}</h2>
//           <div className="messages">
//             {messages[selectedProfile.id]?.length > 0 ? (
//               messages[selectedProfile.id].map((message, index) => (
//                 <div key={index} className="message">
//                   {message}
//                 </div>
//               ))
//             ) : (
//               <p>No messages yet. Start the conversation!</p>
//             )}
//           </div>
//           <div className="input-container">
//             <input
//               type="text"
//               placeholder="Type a message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//             />
//             <button onClick={handleSendMessage}>Send</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatView;


//working ish 
// import React, { useContext, useState, useEffect } from "react";
// import { AppContext } from "./AppContext"; // Import the context
// import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"; // Firestore functions
// import { db, auth } from "./firebase"; // Firebase config
// import "./styles/ChatView.css";

// const ChatView = () => {
//   const { likedProfiles } = useContext(AppContext); // Access liked profiles
//   const [selectedProfile, setSelectedProfile] = useState(null); // Track the currently selected profile
//   const [messages, setMessages] = useState([]); // Store messages for the selected profile
//   const [newMessage, setNewMessage] = useState(""); // Track the current input message
//   const currentUserId = auth.currentUser?.uid;

//   // Fetch messages for the selected profile
//   useEffect(() => {
//     if (selectedProfile) {
//       const fetchMessages = async () => {
//         try {
//           const chatDocRef = doc(
//             db,
//             "chats",
//             `${currentUserId}_${selectedProfile.id}`
//           );
//           const chatDocSnap = await getDoc(chatDocRef);

//           if (chatDocSnap.exists()) {
//             setMessages(chatDocSnap.data().messages || []);
//           } else {
//             setMessages([]); // Initialize empty messages if no chat exists
//           }
//         } catch (error) {
//           console.error("Error fetching chat messages:", error);
//         }
//       };

//       fetchMessages();
//     }
//   }, [selectedProfile, currentUserId]);

//   // Send a message
//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedProfile) return; // Prevent sending empty messages

//     const newMessageObject = {
//       senderId: currentUserId,
//       text: newMessage.trim(),
//       timestamp: new Date().toISOString(),
//     };

//     const chatDocRef = doc(
//       db,
//       "chats",
//       `${currentUserId}_${selectedProfile.id}`
//     );

//     try {
//       // Add the message to Firestore
//       await updateDoc(chatDocRef, {
//         messages: [...messages, newMessageObject],
//       }).catch(async (err) => {
//         // If the document doesn't exist, create it
//         if (err.code === "not-found") {
//           await setDoc(chatDocRef, { messages: [newMessageObject] });
//         } else {
//           throw err;
//         }
//       });

//       // Update the local messages state
//       setMessages((prevMessages) => [...prevMessages, newMessageObject]);
//       setNewMessage(""); // Clear the input field
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   if (likedProfiles.length === 0) {
//     return (
//       <div className="chat-container">
//         <h1>No Matches Yet</h1>
//         <p>Like someone in Matchmaking to start chatting!</p>
//       </div>
//     );
//   }

//   return (
//     <div className="chat-container">
//       <h1>Your Matches</h1>
//       <div className="chat-list">
//         {likedProfiles.map((profile) => (
//           <div
//             key={profile.id}
//             className={`chat-card ${
//               selectedProfile?.id === profile.id ? "active" : ""
//             }`}
//             onClick={() => setSelectedProfile(profile)} // Set selected profile
//           >
//             <img src={profile.photo} alt={profile.name} className="chat-photo" />
//             <h2>{profile.name}</h2>
//             <p>{profile.bio}</p>
//           </div>
//         ))}
//       </div>

//       {selectedProfile && (
//         <div className="chat-box">
//           <h2>Chat with {selectedProfile.name}</h2>
//           <div className="messages">
//             {messages.length > 0 ? (
//               messages.map((message, index) => (
//                 <div
//                   key={index}
//                   className={`message ${
//                     message.senderId === currentUserId ? "sent" : "received"
//                   }`}
//                 >
//                   {message.text}
//                 </div>
//               ))
//             ) : (
//               <p>No messages yet. Start the conversation!</p>
//             )}
//           </div>
//           <div className="input-container">
//             <input
//               type="text"
//               placeholder="Type a message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//             />
//             <button onClick={handleSendMessage}>Send</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatView;

//best ONE SO FAR!!!!!!!!!!!!!!!!!!!!!!!!

// import React, { useContext, useState, useEffect } from "react";
// import { AppContext } from "./AppContext"; // Import the context
// import { db, auth } from "./firebase"; // Firebase imports
// import { collection, doc, getDoc, updateDoc, arrayUnion, addDoc } from "firebase/firestore";
// import "./styles/ChatView.css";

// const ChatView = () => {
//   const { likedProfiles } = useContext(AppContext); // Access liked profiles
//   const [selectedProfile, setSelectedProfile] = useState(null); // Track the currently selected profile
//   const [messages, setMessages] = useState([]); // Store messages for each profile
//   const [newMessage, setNewMessage] = useState(""); // Track the current input message
//   const currentUserId = auth.currentUser?.uid;

//   useEffect(() => {
//     const fetchChat = async () => {
//       if (!selectedProfile) return;
//       try {
//         const chatDocRef = doc(db, "chats", `${currentUserId}_${selectedProfile.id}`);
//         const chatDocSnap = await getDoc(chatDocRef);
//         if (chatDocSnap.exists()) {
//           setMessages(chatDocSnap.data().messages || []);
//         }
//       } catch (error) {
//         console.error("Error fetching chat messages:", error);
//       }
//     };

//     fetchChat();
//   }, [selectedProfile, currentUserId]);

//   const handleSendMessage = async () => {
//     if (!newMessage.trim()) return; // Prevent sending empty messages
//     const newChatMessage = { sender: currentUserId, text: newMessage };

//     try {
//       const chatDocRef = doc(db, "chats", `${currentUserId}_${selectedProfile.id}`);
//       await updateDoc(chatDocRef, {
//         messages: arrayUnion(newChatMessage),
//       });

//       setMessages((prevMessages) => [...prevMessages, newChatMessage]);
//       setNewMessage(""); // Clear the input field
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   if (likedProfiles.length === 0) {
//     return (
//       <div className="chat-container">
//         <h1>No Matches Yet</h1>
//         <p>Like someone in Matchmaking to start chatting!</p>
//       </div>
//     );
//   }

//   return (
//     <div className="chat-container">
//       <h1>Your Matches</h1>
//       <div className="chat-list">
//         {likedProfiles.map((profile) => (
//           <div
//             key={profile.id}
//             className={`chat-card ${
//               selectedProfile?.id === profile.id ? "active" : ""
//             }`}
//             onClick={() => setSelectedProfile(profile)} // Set selected profile
//           >
//             <img src={profile.photo} alt={profile.name} className="chat-photo" />
//             <h2>{profile.name}</h2>
//             <p>{profile.bio}</p>
//           </div>
//         ))}
//       </div>

//       {selectedProfile && (
//         <div className="chat-box">
//           <h2>Chat with {selectedProfile.name}</h2>
//           <div className="messages">
//             {messages.length > 0 ? (
//               messages.map((message, index) => (
//                 <div
//                   key={index}
//                   className={`message ${
//                     message.sender === currentUserId ? "outgoing" : "incoming"
//                   }`}
//                 >
//                   {message.text}
//                 </div>
//               ))
//             ) : (
//               <p>No messages yet. Start the conversation!</p>
//             )}
//           </div>
//           <div className="input-container">
//             <input
//               type="text"
//               placeholder="Type a message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//             />
//             <button onClick={handleSendMessage}>Send</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatView;

//THIS IS THE ONE: YESS
import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "./AppContext"; // Import the context
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  addDoc,
  getDocs,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "./firebase"; // Firebase imports
import "./styles/ChatView.css";

const ChatView = () => {
  const { likedProfiles } = useContext(AppContext); // Access liked profiles
  const [matches, setMatches] = useState([]); // Store matched profiles
  const [selectedProfile, setSelectedProfile] = useState(null); // Track the currently selected profile
  const [messages, setMessages] = useState([]); // Store messages for the selected profile
  const [newMessage, setNewMessage] = useState(""); // Track the current input message
  const currentUserId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const userDocRef = doc(db, "people", currentUserId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const matchedUserIds = userData.matches || [];

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

  useEffect(() => {
    let unsubscribe;

    const fetchChatMessages = async () => {
      if (!selectedProfile) return;

      try {
        const chatQuery = query(
          collection(db, "chat"),
          where("participants", "array-contains", currentUserId)
        );

        const querySnapshot = await getDocs(chatQuery);

        const chatDoc = querySnapshot.docs.find((doc) =>
          doc.data().participants.includes(selectedProfile.id)
        );

        if (chatDoc) {
          const messagesRef = collection(db, "chat", chatDoc.id, "messages");
          unsubscribe = onSnapshot(messagesRef, (snapshot) => {
            const fetchedMessages = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setMessages(
              fetchedMessages.sort((a, b) => a.timestamp - b.timestamp)
            );
          });
        } else {
          setMessages([]);
        }
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    };

    fetchChatMessages();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [selectedProfile, currentUserId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedProfile) return;

    try {
      const chatQuery = query(
        collection(db, "chat"),
        where("participants", "array-contains", currentUserId)
      );

      const querySnapshot = await getDocs(chatQuery);

      let chatDoc = querySnapshot.docs.find((doc) =>
        doc.data().participants.includes(selectedProfile.id)
      );

      if (!chatDoc) {
        const chatRef = await addDoc(collection(db, "chat"), {
          participants: [currentUserId, selectedProfile.id],
        });
        chatDoc = { id: chatRef.id };
      }

      const messagesRef = collection(db, "chat", chatDoc.id, "messages");
      await addDoc(messagesRef, {
        senderId: currentUserId,
        text: newMessage,
        timestamp: serverTimestamp(),
      });

      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (matches.length === 0) {
    return (
      <div className="chat-container">
        <h1>No Matches Yet</h1>
        <p>Like someone in Matchmaking to start chatting!</p>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <h1>Your Matches</h1>
      <div className="chat-list">
        {matches.map((match) => (
          <div
            key={match.id}
            className={`chat-card ${
              selectedProfile?.id === match.id ? "active" : ""
            }`}
            onClick={() => setSelectedProfile(match)}
          >
            <img
              src={match.profileImages?.[0] || "https://via.placeholder.com/150"}
              alt={match.name}
              className="chat-photo"
            />
            <h2>{match.name}</h2>
            <p>{match.bio}</p>
          </div>
        ))}
      </div>

      {selectedProfile && (
        <div className="chat-box">
          <h2>Chat with {selectedProfile.name}</h2>
          <div className="messages">
            {messages.length > 0 ? (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`message ${
                    message.senderId === currentUserId ? "outgoing" : "incoming"
                  }`}
                >
                  <p className="text">{message.text}</p>
                  <span className="timestamp">
                    {new Date(
                      message.timestamp?.seconds * 1000
                    ).toLocaleTimeString()}
                  </span>
                </div>
              ))
            ) : (
              <p>No messages yet. Start the conversation!</p>
            )}
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatView;


//EVEN CLOSER, JUST FIXING THE MESSAGING SIDE 
// import React, { useContext, useState, useEffect } from "react";
// import { AppContext } from "./AppContext"; // Import the context
// import {
//   collection,
//   query,
//   where,
//   doc,
//   getDoc,
//   addDoc,
//   getDocs,
//   onSnapshot,
//   serverTimestamp,
// } from "firebase/firestore";
// import { db, auth } from "./firebase"; // Firebase imports
// import "./styles/ChatView.css";

// const ChatView = () => {
//   const { likedProfiles } = useContext(AppContext); // Access liked profiles
//   const [matches, setMatches] = useState([]); // Store matched profiles
//   const [selectedProfile, setSelectedProfile] = useState(null); // Track the currently selected profile
//   const [messages, setMessages] = useState([]); // Store messages for the selected profile
//   const [newMessage, setNewMessage] = useState(""); // Track the current input message
//   const currentUserId = auth.currentUser?.uid;

//   useEffect(() => {
//     const fetchMatches = async () => {
//       try {
//         const userDocRef = doc(db, "people", currentUserId);
//         const userDocSnap = await getDoc(userDocRef);

//         if (userDocSnap.exists()) {
//           const userData = userDocSnap.data();
//           const matchedUserIds = userData.matches || [];

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

//     fetchMatches();
//   }, [currentUserId]);

//   useEffect(() => {
//     let unsubscribe;

//     const fetchChatMessages = async () => {
//       if (!selectedProfile) return;

//       try {
//         const chatQuery = query(
//           collection(db, "chat"),
//           where("participants", "array-contains", currentUserId)
//         );

//         const querySnapshot = await getDocs(chatQuery);

//         const chatDoc = querySnapshot.docs.find((doc) =>
//           doc.data().participants.includes(selectedProfile.id)
//         );

//         if (chatDoc) {
//           const messagesRef = collection(db, "chat", chatDoc.id, "messages");
//           unsubscribe = onSnapshot(messagesRef, (snapshot) => {
//             const fetchedMessages = snapshot.docs.map((doc) => ({
//               id: doc.id,
//               ...doc.data(),
//             }));
//             setMessages(
//               fetchedMessages.sort((a, b) => a.timestamp - b.timestamp)
//             );
//           });
//         } else {
//           setMessages([]);
//         }
//       } catch (error) {
//         console.error("Error fetching chat messages:", error);
//       }
//     };

//     fetchChatMessages();

//     return () => {
//       if (unsubscribe) unsubscribe();
//     };
//   }, [selectedProfile, currentUserId]);

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedProfile) return;

//     try {
//       const chatQuery = query(
//         collection(db, "chat"),
//         where("participants", "array-contains", currentUserId)
//       );

//       const querySnapshot = await getDocs(chatQuery);

//       let chatDoc = querySnapshot.docs.find((doc) =>
//         doc.data().participants.includes(selectedProfile.id)
//       );

//       if (!chatDoc) {
//         const chatRef = await addDoc(collection(db, "chat"), {
//           participants: [currentUserId, selectedProfile.id],
//         });
//         chatDoc = { id: chatRef.id };
//       }

//       const messagesRef = collection(db, "chat", chatDoc.id, "messages");
//       await addDoc(messagesRef, {
//         senderId: currentUserId,
//         text: newMessage,
//         timestamp: serverTimestamp(),
//       });

//       setNewMessage("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   if (matches.length === 0) {
//     return (
//       <div className="chat-container">
//         <h1>No Matches Yet</h1>
//         <p>Like someone in Matchmaking to start chatting!</p>
//       </div>
//     );
//   }

//   return (
//     <div className="chat-container">
//       <h1>Your Matches</h1>
//       <div className="chat-list">
//         {matches.map((match) => (
//           <div
//             key={match.id}
//             className={`chat-card ${
//               selectedProfile?.id === match.id ? "active" : ""
//             }`}
//             onClick={() => setSelectedProfile(match)}
//           >
//             <img
//               src={match.profileImages?.[0] || "https://via.placeholder.com/150"}
//               alt={match.name}
//               className="chat-photo"
//             />
//             <h2>{match.name}</h2>
//             <p>{match.bio}</p>
//           </div>
//         ))}
//       </div>

//       {selectedProfile && (
//         <div className="chat-box">
//           <h2>Chat with {selectedProfile.name}</h2>
//           <div className="messages">
//             {messages.length > 0 ? (
//               messages.map((message) => (
//                 <div
//                   key={message.id}
//                   className={`message ${
//                     message.senderId === currentUserId ? "outgoing" : "incoming"
//                   }`}
//                 >
//                   <p className="text">{message.text}</p>
//                   <span className="timestamp">
//                     {new Date(
//                       message.timestamp?.seconds * 1000
//                     ).toLocaleTimeString()}
//                   </span>
//                 </div>
//               ))
//             ) : (
//               <p>No messages yet. Start the conversation!</p>
//             )}
//           </div>
//           <div className="input-container">
//             <input
//               type="text"
//               placeholder="Type a message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//             />
//             <button onClick={handleSendMessage}>Send</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatView;




//////OMGGGGGGGGG IT WORKSSSSS 
// import React, { useContext, useState, useEffect } from "react";
// import { AppContext } from "./AppContext"; // Import the context
// import {
//   collection,
//   query,
//   where,
//   doc,
//   getDoc,
//   addDoc,
//   setDoc,
//   getDocs,
//   onSnapshot,
//   serverTimestamp,
// } from "firebase/firestore";
// import { db, auth } from "./firebase"; // Firebase imports
// import "./styles/ChatView.css";

// const ChatView = () => {
//   const { likedProfiles } = useContext(AppContext); // Access liked profiles
//   const [matches, setMatches] = useState([]); // Store matched profiles
//   const [selectedProfile, setSelectedProfile] = useState(null); // Track the currently selected profile
//   const [messages, setMessages] = useState([]); // Store messages for the selected profile
//   const [newMessage, setNewMessage] = useState(""); // Track the current input message
//   const currentUserId = auth.currentUser?.uid;

//   useEffect(() => {
//     const fetchMatchesAndChats = async () => {
//       try {
//         // Fetch the current user's document to get matches
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

//     fetchMatchesAndChats();
//   }, [currentUserId]);

//   useEffect(() => {
//     let unsubscribe;

//     const fetchChatMessages = async () => {
//       if (!selectedProfile) return;

//       try {
//         // Query the `chat` collection to find the chat document
//         const chatQuery = query(
//           collection(db, "chat"),
//           where("participants", "array-contains", currentUserId)
//         );

//         const querySnapshot = await getDocs(chatQuery);

//         // Find the chat document for the current user and selected profile
//         const chatDoc = querySnapshot.docs.find((doc) =>
//           doc.data().participants.includes(selectedProfile.id)
//         );

//         if (chatDoc) {
//           // Set up a listener for real-time messages
//           const messagesRef = collection(db, "chat", chatDoc.id, "messages");
//           unsubscribe = onSnapshot(messagesRef, (snapshot) => {
//             const fetchedMessages = snapshot.docs.map((doc) => ({
//               id: doc.id,
//               ...doc.data(),
//             }));
//             setMessages(fetchedMessages.sort((a, b) => a.timestamp - b.timestamp)); // Sort messages by timestamp
//           });
//         } else {
//           // No existing chat; reset messages
//           setMessages([]);
//         }
//       } catch (error) {
//         console.error("Error fetching chat messages:", error);
//       }
//     };

//     fetchChatMessages();

//     return () => {
//       if (unsubscribe) unsubscribe();
//     };
//   }, [selectedProfile, currentUserId]);

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedProfile) return; // Prevent sending empty messages

//     try {
//       // Query the `chat` collection for a chat document
//       const chatQuery = query(
//         collection(db, "chat"),
//         where("participants", "array-contains", currentUserId)
//       );

//       const querySnapshot = await getDocs(chatQuery);

//       // Find the existing chat document or create a new one
//       let chatDoc = querySnapshot.docs.find((doc) =>
//         doc.data().participants.includes(selectedProfile.id)
//       );

//       if (!chatDoc) {
//         // Create a new chat document
//         const chatRef = await addDoc(collection(db, "chat"), {
//           participants: [currentUserId, selectedProfile.id],
//         });
//         chatDoc = { id: chatRef.id };
//       }

//       // Add the new message to the `messages` subcollection
//       const messagesRef = collection(db, "chat", chatDoc.id, "messages");
//       await addDoc(messagesRef, {
//         sender: currentUserId,
//         text: newMessage,
//         timestamp: serverTimestamp(),
//       });

//       setNewMessage(""); // Clear the input field
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   if (matches.length === 0) {
//     return (
//       <div className="chat-container">
//         <h1>No Matches Yet</h1>
//         <p>Like someone in Matchmaking to start chatting!</p>
//       </div>
//     );
//   }

//   return (
//     <div className="chat-container">
//       <h1>Your Matches</h1>
//       <div className="chat-list">
//         {matches.map((match) => (
//           <div
//             key={match.id}
//             className={`chat-card ${
//               selectedProfile?.id === match.id ? "active" : ""
//             }`}
//             onClick={() => setSelectedProfile(match)} // Set selected profile
//           >
//             <img
//               src={match.profileImages?.[0] || "https://via.placeholder.com/150"}
//               alt={match.name}
//               className="chat-photo"
//             />
//             <h2>{match.name}</h2>
//             <p>{match.bio}</p>
//           </div>
//         ))}
//       </div>

//       {selectedProfile && (
//         <div className="chat-box">
//           <h2>Chat with {selectedProfile.name}</h2>
//           <div className="messages">
//             {messages.length > 0 ? (
//               messages.map((message, index) => (
//                 <div
//                   key={index}
//                   className={`message ${
//                     message.sender === currentUserId ? "outgoing" : "incoming"
//                   }`}
//                 >
//                   {message.text}
//                 </div>
//               ))
//             ) : (
//               <p>No messages yet. Start the conversation!</p>
//             )}
//           </div>
//           <div className="input-container">
//             <input
//               type="text"
//               placeholder="Type a message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//             />
//             <button onClick={handleSendMessage}>Send</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatView;


///this worked with saving the chat messages but one-way chat 
// import React, { useContext, useState, useEffect } from "react";
// import { AppContext } from "./AppContext"; // Import the context
// import { db, auth } from "./firebase"; // Firebase imports
// import { collection, doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
// import "./styles/ChatView.css";

// const ChatView = () => {
//   const { likedProfiles } = useContext(AppContext); // Access liked profiles
//   const [matches, setMatches] = useState([]); // Store matched profiles
//   const [selectedProfile, setSelectedProfile] = useState(null); // Track the currently selected profile
//   const [messages, setMessages] = useState([]); // Store messages for the selected profile
//   const [newMessage, setNewMessage] = useState(""); // Track the current input message
//   const currentUserId = auth.currentUser?.uid;

//   useEffect(() => {
//     const fetchMatchesAndChats = async () => {
//       try {
//         // Fetch the current user's document to get matches
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

//     fetchMatchesAndChats();
//   }, [currentUserId]);

//   useEffect(() => {
//     const fetchChat = async () => {
//       if (!selectedProfile) return;
//       try {
//         const chatDocRef = doc(db, "chats", getChatId(currentUserId, selectedProfile.id));
//         const chatDocSnap = await getDoc(chatDocRef);
//         if (chatDocSnap.exists()) {
//           setMessages(chatDocSnap.data().messages || []);
//         } else {
//           setMessages([]);
//         }
//       } catch (error) {
//         console.error("Error fetching chat messages:", error);
//       }
//     };

//     fetchChat();
//   }, [selectedProfile, currentUserId]);

//   const getChatId = (userId1, userId2) => {
//     // Generate a consistent chat ID for two users
//     return [userId1, userId2].sort().join("_");
//   };

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedProfile) return; // Prevent sending empty messages
//     const newChatMessage = { sender: currentUserId, text: newMessage };

//     const chatId = getChatId(currentUserId, selectedProfile.id);

//     try {
//       const chatDocRef = doc(db, "chats", chatId);

//       // Create chat document if it doesn't exist
//       const chatDocSnap = await getDoc(chatDocRef);
//       if (!chatDocSnap.exists()) {
//         await setDoc(chatDocRef, { messages: [] });
//       }

//       // Update messages in the chat document
//       await updateDoc(chatDocRef, {
//         messages: arrayUnion(newChatMessage),
//       });

//       setMessages((prevMessages) => [...prevMessages, newChatMessage]);
//       setNewMessage(""); // Clear the input field
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   if (matches.length === 0) {
//     return (
//       <div className="chat-container">
//         <h1>No Matches Yet</h1>
//         <p>Like someone in Matchmaking to start chatting!</p>
//       </div>
//     );
//   }

//   return (
//     <div className="chat-container">
//       <h1>Your Matches</h1>
//       <div className="chat-list">
//         {matches.map((match) => (
//           <div
//             key={match.id}
//             className={`chat-card ${
//               selectedProfile?.id === match.id ? "active" : ""
//             }`}
//             onClick={() => setSelectedProfile(match)} // Set selected profile
//           >
//             <img src={match.profileImages?.[0] || "https://via.placeholder.com/150"} alt={match.name} className="chat-photo" />
//             <h2>{match.name}</h2>
//             <p>{match.bio}</p>
//           </div>
//         ))}
//       </div>

//       {selectedProfile && (
//         <div className="chat-box">
//           <h2>Chat with {selectedProfile.name}</h2>
//           <div className="messages">
//             {messages.length > 0 ? (
//               messages.map((message, index) => (
//                 <div
//                   key={index}
//                   className={`message ${
//                     message.sender === currentUserId ? "outgoing" : "incoming"
//                   }`}
//                 >
//                   {message.text}
//                 </div>
//               ))
//             ) : (
//               <p>No messages yet. Start the conversation!</p>
//             )}
//           </div>
//           <div className="input-container">
//             <input
//               type="text"
//               placeholder="Type a message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//             />
//             <button onClick={handleSendMessage}>Send</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatView;
















// import React, { useState, useEffect } from "react";
// import {
//   collection,
//   query,
//   where,
//   onSnapshot,
//   addDoc,
//   orderBy,
//   serverTimestamp,
// } from "firebase/firestore";
// import { db, auth } from "./firebase";
// import "./styles/ChatView.css";

// const ChatView = () => {
//   const [chats, setChats] = useState([]); // Chats involving the user
//   const [selectedChatId, setSelectedChatId] = useState(null); // Currently selected chat
//   const [messages, setMessages] = useState([]); // Messages in the selected chat
//   const [newMessage, setNewMessage] = useState(""); // New message input
//   const currentUserId = auth.currentUser?.uid; // Current user's ID

//   // Fetch chats involving the current user
//   useEffect(() => {
//     if (!currentUserId) return;

//     const chatQuery = query(
//       collection(db, "chat"),
//       where("users", "array-contains", currentUserId)
//     );

//     const unsubscribe = onSnapshot(chatQuery, (snapshot) => {
//       const fetchedChats = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setChats(fetchedChats);
//     });

//     return () => unsubscribe();
//   }, [currentUserId]);

//   // Fetch messages for the selected chat
//   useEffect(() => {
//     if (!selectedChatId) return;

//     const messagesQuery = query(
//       collection(db, "chat", selectedChatId, "messages"),
//       orderBy("time", "asc")
//     );

//     const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
//       const fetchedMessages = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setMessages(fetchedMessages);
//     });

//     return () => unsubscribe();
//   }, [selectedChatId]);

//   // Send a new message
//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedChatId) return;

//     const messagesRef = collection(db, "chat", selectedChatId, "messages");

//     try {
//       await addDoc(messagesRef, {
//         senderId: currentUserId,
//         text: newMessage.trim(),
//         time: serverTimestamp(),
//       });
//       setNewMessage(""); // Clear the input field
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-list">
//         <h2>Your Chats</h2>
//         {chats.length > 0 ? (
//           chats.map((chat) => (
//             <div
//               key={chat.id}
//               className={`chat-card ${
//                 selectedChatId === chat.id ? "active" : ""
//               }`}
//               onClick={() => setSelectedChatId(chat.id)}
//             >
//               <h3>
//                 Chat with:{" "}
//                 {chat.users
//                   .filter((userId) => userId !== currentUserId)
//                   .join(", ")}
//               </h3>
//             </div>
//           ))
//         ) : (
//           <p>No chats available.</p>
//         )}
//       </div>

//       <div className="chat-panel">
//         {selectedChatId ? (
//           <>
//             <div className="messages">
//               {messages.map((msg) => (
//                 <div
//                   key={msg.id}
//                   className={`message ${
//                     msg.senderId === currentUserId ? "sent" : "received"
//                   }`}
//                 >
//                   {msg.text}
//                 </div>
//               ))}
//             </div>
//             <div className="input-container">
//               <input
//                 type="text"
//                 placeholder="Type a message..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//               />
//               <button onClick={handleSendMessage}>Send</button>
//             </div>
//           </>
//         ) : (
//           <p>Select a chat to view messages.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatView;

// import React, { useState, useEffect } from "react";
// import {
//   collection,
//   query,
//   where,
//   onSnapshot,
//   addDoc,
//   orderBy,
//   serverTimestamp,
// } from "firebase/firestore";
// import { db, auth } from "./firebase";
// import "./styles/ChatView.css";

// const ChatView = () => {
//   const [chats, setChats] = useState([]); // Chats involving the user
//   const [selectedChatId, setSelectedChatId] = useState(null); // Currently selected chat
//   const [messages, setMessages] = useState([]); // Messages in the selected chat
//   const [newMessage, setNewMessage] = useState(""); // New message input
//   const currentUserId = auth.currentUser?.uid; // Current user's ID

//   // Fetch chats involving the current user
//   useEffect(() => {
//     if (!currentUserId) return;

//     const chatQuery = query(
//       collection(db, "chat"),
//       where("users", "array-contains", currentUserId)
//     );

//     const unsubscribe = onSnapshot(chatQuery, (snapshot) => {
//       const fetchedChats = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setChats(fetchedChats);
//     });

//     return () => unsubscribe();
//   }, [currentUserId]);

//   // Fetch messages for the selected chat
//   useEffect(() => {
//     if (!selectedChatId) return;

//     const messagesQuery = query(
//       collection(db, "chat", selectedChatId, "messages"),
//       orderBy("time", "asc")
//     );

//     const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
//       const fetchedMessages = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setMessages(fetchedMessages);
//     });

//     return () => unsubscribe();
//   }, [selectedChatId]);

//   // Send a new message
//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedChatId) return;

//     const messagesRef = collection(db, "chat", selectedChatId, "messages");

//     try {
//       await addDoc(messagesRef, {
//         senderId: currentUserId,
//         text: newMessage.trim(),
//         time: serverTimestamp(),
//       });
//       setNewMessage(""); // Clear the input field
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-list">
//         <h2>Your Chats</h2>
//         {chats.length > 0 ? (
//           chats.map((chat) => (
//             <div
//               key={chat.id}
//               className={`chat-card ${
//                 selectedChatId === chat.id ? "active" : ""
//               }`}
//               onClick={() => setSelectedChatId(chat.id)}
//             >
//               <h3>
//                 Chat with:{" "}
//                 {chat.users
//                   .filter((userId) => userId !== currentUserId)
//                   .join(", ")}
//               </h3>
//             </div>
//           ))
//         ) : (
//           <p>No chats available.</p>
//         )}
//       </div>

//       <div className="chat-panel">
//         {selectedChatId ? (
//           <>
//             <div className="messages">
//               {messages.map((msg) => (
//                 <div
//                   key={msg.id}
//                   className={`message ${
//                     msg.senderId === currentUserId ? "sent" : "received"
//                   }`}
//                 >
//                   {msg.text}
//                 </div>
//               ))}
//             </div>
//             <div className="input-container">
//               <input
//                 type="text"
//                 placeholder="Type a message..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//               />
//               <button onClick={handleSendMessage}>Send</button>
//             </div>
//           </>
//         ) : (
//           <p>Select a chat to view messages.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatView;


// import React, { useContext, useState, useEffect } from "react";
// import { AppContext } from "./AppContext"; // Import the context
// import "./styles/ChatView.css";
// import {
//   collection,
//   doc,
//   addDoc,
//   query,
//   onSnapshot,
//   orderBy,
// } from "firebase/firestore";
// import { db, auth } from "./firebase";

// const ChatView = () => {
//   const { likedProfiles } = useContext(AppContext); // Access liked profiles
//   const [matches, setMatches] = useState([]);
//   const [selectedProfile, setSelectedProfile] = useState(null); // Track the currently selected profile
//   const [messages, setMessages] = useState([]); // Messages for the selected profile
//   const [newMessage, setNewMessage] = useState(""); // Current input message
//   const currentUserId = auth.currentUser?.uid;

//   useEffect(() => {
//     // Fetch mutual matches from Firestore
//     const fetchMatches = async () => {
//       const userDocRef = doc(db, "people", currentUserId);
//       const userDocSnap = await getDoc(userDocRef);

//       if (userDocSnap.exists()) {
//         const userData = userDocSnap.data();
//         setMatches(userData.matches || []);
//       }
//     };

//     fetchMatches();
//   }, [currentUserId]);

//   // Load messages for the selected profile
//   useEffect(() => {
//     if (selectedProfile) {
//       const messagesRef = collection(
//         db,
//         "people",
//         currentUserId,
//         "matches",
//         selectedProfile.id,
//         "messages"
//       );

//       const q = query(messagesRef, orderBy("timestamp", "asc"));
//       const unsubscribe = onSnapshot(q, (snapshot) => {
//         setMessages(
//           snapshot.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           }))
//         );
//       });

//       return () => unsubscribe();
//     }
//   }, [selectedProfile, currentUserId]);

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedProfile) return; // Prevent sending empty messages

//     const messageData = {
//       senderId: currentUserId,
//       text: newMessage.trim(),
//       timestamp: new Date(),
//     };

//     try {
//       // Save message in Firestore under the selected match
//       const messagesRef = collection(
//         db,
//         "people",
//         currentUserId,
//         "matches",
//         selectedProfile.id,
//         "messages"
//       );

//       await addDoc(messagesRef, messageData);

//       // Optionally, save the message in the recipient's Firestore as well
//       const recipientMessagesRef = collection(
//         db,
//         "people",
//         selectedProfile.id,
//         "matches",
//         currentUserId,
//         "messages"
//       );
//       await addDoc(recipientMessagesRef, messageData);

//       setNewMessage(""); // Clear input field
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   if (matches.length === 0) {
//     return (
//       <div className="chat-container">
//         <h1>No Matches Yet</h1>
//         <p>Like someone in Matchmaking to start chatting!</p>
//       </div>
//     );
//   }

//   return (
//     <div className="chat-container">
//       <h1>Your Matches</h1>
//       <div className="chat-list">
//         {matches.map((profile) => (
//           <div
//             key={profile.id}
//             className={`chat-card ${
//               selectedProfile?.id === profile.id ? "active" : ""
//             }`}
//             onClick={() => setSelectedProfile(profile)} // Set selected profile
//           >
//             <img
//               src={profile.photo}
//               alt={profile.name}
//               className="chat-photo"
//             />
//             <h2>{profile.name}</h2>
//           </div>
//         ))}
//       </div>

//       {selectedProfile && (
//         <div className="chat-box">
//           <h2>Chat with {selectedProfile.name}</h2>
//           <div className="messages">
//             {messages.length > 0 ? (
//               messages.map((message) => (
//                 <div
//                   key={message.id}
//                   className={`message ${
//                     message.senderId === currentUserId ? "sent" : "received"
//                   }`}
//                 >
//                   {message.text}
//                 </div>
//               ))
//             ) : (
//               <p>No messages yet. Start the conversation!</p>
//             )}
//           </div>
//           <div className="input-container">
//             <input
//               type="text"
//               placeholder="Type a message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//             />
//             <button onClick={handleSendMessage}>Send</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatView;


// import React, { useContext, useState, useEffect } from "react";
// import { AppContext } from "./AppContext"; // Import the context
// import "./styles/ChatView.css";
// import {
//   collection,
//   doc,
//   addDoc,
//   query,
//   onSnapshot,
//   orderBy,
// } from "firebase/firestore"; // Firestore functions
// import { db, auth } from "./firebase"; // Firebase auth instance

// const ChatView = () => {
//   const { likedProfiles } = useContext(AppContext); // Access liked profiles
//   const [matches, setMatches] = useState([]); // Store mutual matches
//   const [selectedProfile, setSelectedProfile] = useState(null); // Track the selected match
//   const [messages, setMessages] = useState([]); // Store messages for the selected match
//   const [newMessage, setNewMessage] = useState(""); // Track the input message
//   const currentUserId = auth.currentUser?.uid; // Current user ID

//   // Fetch mutual matches from Firestore
//   useEffect(() => {
//     const fetchMatches = async () => {
//       const userDocRef = doc(db, "people", currentUserId);
//       const userDocSnap = await getDoc(userDocRef);

//       if (userDocSnap.exists()) {
//         const userData = userDocSnap.data();
//         const matchedUserIds = userData.matches || [];

//         // Fetch details for each matched user
//         const matchPromises = matchedUserIds.map(async (userId) => {
//           const matchDocRef = doc(db, "people", userId);
//           const matchDocSnap = await getDoc(matchDocRef);
//           if (matchDocSnap.exists()) {
//             return { id: matchDocSnap.id, ...matchDocSnap.data() };
//           }
//           return null;
//         });

//         const matchData = (await Promise.all(matchPromises)).filter(Boolean);
//         setMatches(matchData);
//       }
//     };

//     fetchMatches();
//   }, [currentUserId]);

//   // Load messages for the selected profile
//   useEffect(() => {
//     if (selectedProfile) {
//       const messagesRef = collection(
//         db,
//         "chats",
//         generateChatId(currentUserId, selectedProfile.id),
//         "messages"
//       );

//       const q = query(messagesRef, orderBy("timestamp", "asc"));
//       const unsubscribe = onSnapshot(q, (snapshot) => {
//         setMessages(
//           snapshot.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           }))
//         );
//       });

//       return () => unsubscribe();
//     }
//   }, [selectedProfile, currentUserId]);

//   // Helper to generate a unique chat ID for a pair of users
//   const generateChatId = (userId1, userId2) => {
//     return [userId1, userId2].sort().join("_");
//   };

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedProfile) return; // Prevent empty messages

//     const messageData = {
//       senderId: currentUserId,
//       text: newMessage.trim(),
//       timestamp: new Date(),
//     };

//     try {
//       const messagesRef = collection(
//         db,
//         "chats",
//         generateChatId(currentUserId, selectedProfile.id),
//         "messages"
//       );
//       await addDoc(messagesRef, messageData);
//       setNewMessage(""); // Clear the input field
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   if (matches.length === 0) {
//     return (
//       <div className="chat-container">
//         <h1>No Matches Yet</h1>
//         <p>Like someone in Matchmaking to start chatting!</p>
//       </div>
//     );
//   }

//   return (
//     <div className="chat-container">
//       <h1>Your Matches</h1>
//       <div className="chat-list">
//         {matches.map((profile) => (
//           <div
//             key={profile.id}
//             className={`chat-card ${
//               selectedProfile?.id === profile.id ? "active" : ""
//             }`}
//             onClick={() => setSelectedProfile(profile)}
//           >
//             <img
//               src={profile.profileImages?.[0] || "https://via.placeholder.com/150"}
//               alt={profile.name}
//               className="chat-photo"
//             />
//             <h2>{profile.name}</h2>
//           </div>
//         ))}
//       </div>

//       {selectedProfile && (
//         <div className="chat-box">
//           <h2>Chat with {selectedProfile.name}</h2>
//           <div className="messages">
//             {messages.length > 0 ? (
//               messages.map((message, index) => (
//                 <div
//                   key={message.id}
//                   className={`message ${
//                     message.senderId === currentUserId ? "sent" : "received"
//                   }`}
//                 >
//                   {message.text}
//                 </div>
//               ))
//             ) : (
//               <p>No messages yet. Start the conversation!</p>
//             )}
//           </div>
//           <div className="input-container">
//             <input
//               type="text"
//               placeholder="Type a message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//             />
//             <button onClick={handleSendMessage}>Send</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatView;


// import React, { useContext, useState, useEffect } from "react";
// import { AppContext } from "./AppContext";
// import "./styles/ChatView.css";
// import { getOrCreateChat, sendMessage, listenToMessages, fetchUserDetails } from "./firebaseChatUtils";
// import { auth } from "./firebase"; // Firebase auth instance

// const ChatView = () => {
//   const { likedProfiles } = useContext(AppContext);
//   const [matches, setMatches] = useState([]); // Store mutual matches
//   const [selectedProfile, setSelectedProfile] = useState(null); // Track the selected match
//   const [messages, setMessages] = useState([]); // Store messages for the selected match
//   const [newMessage, setNewMessage] = useState(""); // Track the input message
//   const currentUserId = auth.currentUser?.uid;

//   // Fetch and display matches (mutual likes)
//   useEffect(() => {
//     const fetchMatches = async () => {
//       const userMatches = likedProfiles; // Replace with API fetching logic if needed
//       setMatches(userMatches);
//     };

//     fetchMatches();
//   }, [likedProfiles]);

//   // Handle chat selection
//   useEffect(() => {
//     if (selectedProfile) {
//       const chatId = getOrCreateChat(currentUserId, selectedProfile.userId);

//       // Start listening to messages
//       const unsubscribe = listenToMessages(chatId, setMessages);

//       return () => unsubscribe(); // Cleanup listener on unmount
//     }
//   }, [selectedProfile, currentUserId]);

//   // Handle sending a message
//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedProfile) return;

//     const chatId = getOrCreateChat(currentUserId, selectedProfile.userId);
//     await sendMessage(chatId, currentUserId, newMessage.trim());
//     setNewMessage("");
//   };

//   return (
//     <div className="chat-container">
//       <h1>Your Matches</h1>
//       <div className="chat-list">
//         {matches.map((profile) => (
//           <div
//             key={profile.id}
//             className={`chat-card ${
//               selectedProfile?.id === profile.id ? "active" : ""
//             }`}
//             onClick={() => setSelectedProfile(profile)}
//           >
//             <img
//               src={profile.profileImages?.[0] || "https://via.placeholder.com/150"}
//               alt={profile.name}
//               className="chat-photo"
//             />
//             <h2>{profile.name}</h2>
//           </div>
//         ))}
//       </div>

//       {selectedProfile && (
//         <div className="chat-box">
//           <h2>Chat with {selectedProfile.name}</h2>
//           <div className="messages">
//             {messages.map((message) => (
//               <div
//                 key={message.id}
//                 className={`message ${
//                   message.senderId === currentUserId ? "sent" : "received"
//                 }`}
//               >
//                 <p>{message.text}</p>
//               </div>
//             ))}
//           </div>
//           <div className="input-container">
//             <input
//               type="text"
//               placeholder="Type a message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//             />
//             <button onClick={handleSendMessage}>Send</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatView;


// import React, { useEffect, useState } from "react";
// import "./styles/ChatView.css";
// import { fetchUserChats, fetchChatMessages, sendMessage } from "./firebaseChatUtils";
// import { auth } from "./firebase";

// const ChatView = () => {
//   const [chats, setChats] = useState([]); // List of chats
//   const [selectedChat, setSelectedChat] = useState(null); // Selected chat
//   const [messages, setMessages] = useState([]); // Messages in the selected chat
//   const [newMessage, setNewMessage] = useState(""); // Current message input
//   const currentUserId = auth.currentUser?.uid;

//   // Fetch all chats for the current user
//   useEffect(() => {
//     if (!currentUserId) return;
//     const unsubscribe = fetchUserChats(currentUserId, setChats);
//     return () => unsubscribe();
//   }, [currentUserId]);

//   // Fetch messages for the selected chat
//   useEffect(() => {
//     if (!selectedChat) return;
//     const unsubscribe = fetchChatMessages(selectedChat.id, setMessages);
//     return () => unsubscribe();
//   }, [selectedChat]);

//   // Handle sending a message
//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedChat) return;
//     await sendMessage(selectedChat.id, currentUserId, newMessage);
//     setNewMessage(""); // Clear input
//   };

//   return (
//     <div className="chat-container">
//       <h1>Your Chats</h1>
//       <div className="chat-list">
//         {chats.map((chat) => (
//           <div
//             key={chat.id}
//             className={`chat-card ${selectedChat?.id === chat.id ? "active" : ""}`}
//             onClick={() => setSelectedChat(chat)}
//           >
//             <h2>Chat with {chat.users.find((id) => id !== currentUserId)}</h2>
//           </div>
//         ))}
//       </div>

//       {selectedChat && (
//         <div className="chat-box">
//           <h2>Chat</h2>
//           <div className="messages">
//             {messages.map((message) => (
//               <div
//                 key={message.id}
//                 className={`message ${
//                   message.senderId === currentUserId ? "sent" : "received"
//                 }`}
//               >
//                 {message.text}
//               </div>
//             ))}
//           </div>
//           <div className="input-container">
//             <input
//               type="text"
//               placeholder="Type a message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//             />
//             <button onClick={handleSendMessage}>Send</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatView;


// import React, { useEffect, useState } from "react";
// import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
// import { db, auth } from "./firebase";
// import "./styles/ChatView.css";

// const ChatView = ({ selectedChat }) => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const currentUserId = auth.currentUser?.uid;

//   // Fetch messages for the selected chat
//   useEffect(() => {
//     if (!selectedChat?.id) {
//       console.warn("No chat selected");
//       return;
//     }

//     const messagesRef = collection(db, "chat", selectedChat.id, "messages");
//     const messagesQuery = query(messagesRef, orderBy("time", "asc"));

//     const unsubscribe = onSnapshot(
//       messagesQuery,
//       (snapshot) => {
//         const fetchedMessages = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setMessages(fetchedMessages);
//       },
//       (error) => {
//         console.error("Error fetching messages:", error);
//       }
//     );

//     return () => unsubscribe();
//   }, [selectedChat]);

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedChat?.id) {
//       console.warn("Cannot send empty message or invalid chat ID");
//       return;
//     }

//     try {
//       const messagesRef = collection(db, "chat", selectedChat.id, "messages");
//       await addDoc(messagesRef, {
//         senderId: currentUserId,
//         text: newMessage.trim(),
//         time: serverTimestamp(),
//       });
//       setNewMessage(""); // Clear input
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   return (
//     <div className="chat-container">
//       {selectedChat ? (
//         <>
//           <h1>Chat with {selectedChat.name || "Unknown"}</h1>
//           <div className="messages">
//             {messages.map((msg) => (
//               <div
//                 key={msg.id}
//                 className={`message ${
//                   msg.senderId === currentUserId ? "sent" : "received"
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             ))}
//           </div>
//           <div className="input-container">
//             <input
//               type="text"
//               placeholder="Type a message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//             />
//             <button onClick={handleSendMessage}>Send</button>
//           </div>
//         </>
//       ) : (
//         <p>Select a chat to start messaging.</p>
//       )}
//     </div>
//   );
// };

// export default ChatView;
