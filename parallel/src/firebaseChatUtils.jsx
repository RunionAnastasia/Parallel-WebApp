import { collection, addDoc, query, where, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

// Create a new chat if it doesn't already exist
export const createChat = async (userIds) => {
  try {
    const chatRef = collection(db, "chat");
    const newChat = await addDoc(chatRef, {
      users: userIds, // Array of user IDs
    });
    console.log("Chat created with ID:", newChat.id);
    return newChat.id;
  } catch (error) {
    console.error("Error creating chat:", error);
  }
};

// Send a new message to a specific chat
export const sendMessage = async (chatId, senderId, text) => {
  try {
    const messagesRef = collection(db, "chat", chatId, "messages");
    await addDoc(messagesRef, {
      senderId,
      text,
      time: serverTimestamp(),
    });
    console.log("Message sent successfully!");
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

// Fetch all chats for a specific user
export const fetchUserChats = (currentUserId, setChats) => {
  const chatsRef = collection(db, "chat");
  const chatsQuery = query(chatsRef, where("users", "array-contains", currentUserId));

  const unsubscribe = onSnapshot(chatsQuery, (snapshot) => {
    const userChats = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setChats(userChats);
  });

  return unsubscribe;
};

// Fetch messages for a specific chat
export const fetchChatMessages = (chatId, setMessages) => {
  const messagesRef = collection(db, "chat", chatId, "messages");
  const messagesQuery = query(messagesRef, where("time", "asc"));

  const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
    const chatMessages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMessages(chatMessages);
  });

  return unsubscribe;
};
