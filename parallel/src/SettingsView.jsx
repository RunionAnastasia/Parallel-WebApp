
// import React from 'react'

// const SettingsView = () => {
//   return (
//     <div>
//       <h1>Settings</h1>
//     </div>
//   )
// }

// export default SettingsView


// import React, { useState, useEffect } from "react";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { db, auth, storage } from "./firebase"; // Firebase config
// import "./styles/SettingsView.css";

// const SettingsView = () => {
//   const [userSettings, setUserSettings] = useState({
//     emailNotifications: true,
//     pushNotifications: true,
//     matchPreferences: {
//       gender: "All",
//       ageRange: [18, 99],
//       distance: 50,
//     },
//     profileImages: [],
//     faceImages: [],
//   });

//   const currentUserId = auth.currentUser?.uid;

//   useEffect(() => {
//     const fetchUserSettings = async () => {
//       try {
//         const docRef = doc(db, "people", currentUserId);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           const data = docSnap.data();
//           setUserSettings({
//             emailNotifications: data.emailNotifications || true,
//             pushNotifications: data.pushNotifications || true,
//             matchPreferences: data.matchPreferences || {
//               gender: "All",
//               ageRange: [18, 99],
//               distance: 50,
//             },
//             profileImages: data.profileImages || [],
//             faceImages: data.faceImages || [],
//           });
//         } else {
//           console.error("No such document!");
//         }
//       } catch (error) {
//         console.error("Error fetching user settings:", error);
//       }
//     };

//     if (currentUserId) fetchUserSettings();
//   }, [currentUserId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     setUserSettings((prev) => ({
//       ...prev,
//       matchPreferences: { ...prev.matchPreferences, [name]: value },
//     }));
//   };

//   const handleNotificationChange = (e) => {
//     const { name, checked } = e.target;

//     setUserSettings((prev) => ({
//       ...prev,
//       [name]: checked,
//     }));
//   };

//   const handleImageUpload = async (e, type) => {
//     const files = Array.from(e.target.files);
//     const maxFiles = type === "profileImages" ? 5 : 2;

//     if (files.length > maxFiles) {
//       alert(`You can only upload up to ${maxFiles} ${type}`);
//       return;
//     }

//     try {
//       const uploadPromises = files.map((file) => {
//         const storageRef = ref(storage, `${currentUserId}/${type}/${file.name}`);
//         return uploadBytes(storageRef, file).then((snapshot) =>
//           getDownloadURL(snapshot.ref)
//         );
//       });

//       const imageUrls = await Promise.all(uploadPromises);

//       setUserSettings((prev) => ({
//         ...prev,
//         [type]: [...prev[type], ...imageUrls],
//       }));
//     } catch (error) {
//       console.error(`Error uploading ${type}:`, error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const docRef = doc(db, "people", currentUserId);

//       await updateDoc(docRef, {
//         emailNotifications: userSettings.emailNotifications,
//         pushNotifications: userSettings.pushNotifications,
//         matchPreferences: userSettings.matchPreferences,
//         profileImages: userSettings.profileImages,
//         faceImages: userSettings.faceImages,
//       });

//       alert("Settings updated successfully!");
//     } catch (error) {
//       console.error("Error updating settings:", error);
//     }
//   };

//   return (
//     <div className="settings-container">
//       <h1>Settings</h1>
//       <form className="settings-form" onSubmit={handleSubmit}>
//         {/* Notifications */}
//         <div className="section">
//           <h2>Notification Preferences</h2>
//           <label>
//             <input
//               type="checkbox"
//               name="emailNotifications"
//               checked={userSettings.emailNotifications}
//               onChange={handleNotificationChange}
//             />
//             Email Notifications
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               name="pushNotifications"
//               checked={userSettings.pushNotifications}
//               onChange={handleNotificationChange}
//             />
//             Push Notifications
//           </label>
//         </div>

//         {/* Match Preferences */}
//         <div className="section">
//           <h2>Match Preferences</h2>
//           <label>
//             Gender:
//             <select
//               name="gender"
//               value={userSettings.matchPreferences.gender}
//               onChange={handleInputChange}
//             >
//               <option value="All">All</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Non-binary">Non-binary</option>
//             </select>
//           </label>
//           <label>
//             Age Range:
//             <input
//               type="number"
//               name="ageRange"
//               value={userSettings.matchPreferences.ageRange[0]}
//               onChange={(e) =>
//                 setUserSettings((prev) => ({
//                   ...prev,
//                   matchPreferences: {
//                     ...prev.matchPreferences,
//                     ageRange: [
//                       parseInt(e.target.value, 10),
//                       prev.matchPreferences.ageRange[1],
//                     ],
//                   },
//                 }))
//               }
//               placeholder="Min Age"
//             />
//             -
//             <input
//               type="number"
//               name="ageRange"
//               value={userSettings.matchPreferences.ageRange[1]}
//               onChange={(e) =>
//                 setUserSettings((prev) => ({
//                   ...prev,
//                   matchPreferences: {
//                     ...prev.matchPreferences,
//                     ageRange: [
//                       prev.matchPreferences.ageRange[0],
//                       parseInt(e.target.value, 10),
//                     ],
//                   },
//                 }))
//               }
//               placeholder="Max Age"
//             />
//           </label>
//           <label>
//             Distance (km):
//             <input
//               type="number"
//               name="distance"
//               value={userSettings.matchPreferences.distance}
//               onChange={handleInputChange}
//             />
//           </label>
//         </div>

//         {/* Image Upload */}
//         <div className="section">
//           <h2>Upload Images</h2>
//           <label>
//             Profile Images (5 max):
//             <input
//               type="file"
//               multiple
//               onChange={(e) => handleImageUpload(e, "profileImages")}
//             />
//           </label>
//           <label>
//             Face Images (2 max):
//             <input
//               type="file"
//               multiple
//               onChange={(e) => handleImageUpload(e, "faceImages")}
//             />
//           </label>
//         </div>

//         <button type="submit" className="save-button">
//           Save Settings
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SettingsView;

// import React, { useState, useEffect } from "react";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { db, auth, storage } from "./firebase"; // Firebase config
// import "./styles/SettingsView.css";

// const SettingsView = () => {
//   const [userSettings, setUserSettings] = useState({
//     emailNotifications: true,
//     pushNotifications: true,
//     matchPreferences: {
//       gender: "All",
//       ageRange: [18, 99],
//       distance: 50,
//     },
//     profileImages: [],
//     faceImages: [],
//   });

//   const [loading, setLoading] = useState(true);
//   const [uploading, setUploading] = useState(false); // For image upload state
//   const currentUserId = auth.currentUser?.uid;

//   useEffect(() => {
//     const fetchUserSettings = async () => {
//       if (!currentUserId) {
//         console.error("User not logged in!");
//         setLoading(false);
//         return;
//       }

//       try {
//         const docRef = doc(db, "people", currentUserId);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           const data = docSnap.data();
//           setUserSettings({
//             emailNotifications: data.emailNotifications || true,
//             pushNotifications: data.pushNotifications || true,
//             matchPreferences: data.matchPreferences || {
//               gender: "All",
//               ageRange: [18, 99],
//               distance: 50,
//             },
//             profileImages: data.profileImages || [],
//             faceImages: data.faceImages || [],
//           });
//         } else {
//           console.error("No such document!");
//         }
//       } catch (error) {
//         console.error("Error fetching user settings:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserSettings();
//   }, [currentUserId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     setUserSettings((prev) => ({
//       ...prev,
//       matchPreferences: { ...prev.matchPreferences, [name]: value },
//     }));
//   };

//   const handleNotificationChange = (e) => {
//     const { name, checked } = e.target;

//     setUserSettings((prev) => ({
//       ...prev,
//       [name]: checked,
//     }));
//   };

//   const handleImageUpload = async (e, type) => {
//     const files = Array.from(e.target.files);
//     const maxFiles = type === "profileImages" ? 5 : 2;

//     if (files.length + userSettings[type].length > maxFiles) {
//       alert(`You can only upload up to ${maxFiles} ${type}.`);
//       return;
//     }

//     setUploading(true);
//     try {
//       const uploadedUrls = await Promise.all(
//         files.map(async (file) => {
//           const uniqueName = `${Date.now()}_${file.name}`;
//           const storageRef = ref(storage, `${currentUserId}/${type}/${uniqueName}`);
//           await uploadBytes(storageRef, file);
//           return await getDownloadURL(storageRef);
//         })
//       );

//       setUserSettings((prev) => ({
//         ...prev,
//         [type]: [...prev[type], ...uploadedUrls],
//       }));
//     } catch (error) {
//       console.error(`Error uploading ${type}:`, error);
//       alert("Error uploading images. Please try again.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const docRef = doc(db, "people", currentUserId);

//       await updateDoc(docRef, {
//         emailNotifications: userSettings.emailNotifications,
//         pushNotifications: userSettings.pushNotifications,
//         matchPreferences: userSettings.matchPreferences,
//         profileImages: userSettings.profileImages,
//         faceImages: userSettings.faceImages,
//       });

//       alert("Settings updated successfully!");
//     } catch (error) {
//       console.error("Error updating settings:", error);
//       alert("Failed to save settings. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <div className="settings-loading">Loading...</div>;
//   }

//   return (
//     <div className="settings-container">
//       <h1>Settings</h1>
//       <form className="settings-form" onSubmit={handleSubmit}>
//         {/* Notifications */}
//         <div className="section">
//           <h2>Notification Preferences</h2>
//           <label>
//             <input
//               type="checkbox"
//               name="emailNotifications"
//               checked={userSettings.emailNotifications}
//               onChange={handleNotificationChange}
//             />
//             Email Notifications
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               name="pushNotifications"
//               checked={userSettings.pushNotifications}
//               onChange={handleNotificationChange}
//             />
//             Push Notifications
//           </label>
//         </div>

//         {/* Match Preferences */}
//         <div className="section">
//           <h2>Match Preferences</h2>
//           <label>
//             Gender:
//             <select
//               name="gender"
//               value={userSettings.matchPreferences.gender}
//               onChange={handleInputChange}
//             >
//               <option value="All">All</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Non-binary">Non-binary</option>
//             </select>
//           </label>
//           <label>
//             Age Range:
//             <input
//               type="number"
//               name="ageRange"
//               value={userSettings.matchPreferences.ageRange[0]}
//               onChange={(e) =>
//                 setUserSettings((prev) => ({
//                   ...prev,
//                   matchPreferences: {
//                     ...prev.matchPreferences,
//                     ageRange: [
//                       parseInt(e.target.value, 10),
//                       prev.matchPreferences.ageRange[1],
//                     ],
//                   },
//                 }))
//               }
//               placeholder="Min Age"
//             />
//             -
//             <input
//               type="number"
//               name="ageRange"
//               value={userSettings.matchPreferences.ageRange[1]}
//               onChange={(e) =>
//                 setUserSettings((prev) => ({
//                   ...prev,
//                   matchPreferences: {
//                     ...prev.matchPreferences,
//                     ageRange: [
//                       prev.matchPreferences.ageRange[0],
//                       parseInt(e.target.value, 10),
//                     ],
//                   },
//                 }))
//               }
//               placeholder="Max Age"
//             />
//           </label>
//           <label>
//             Distance (km):
//             <input
//               type="number"
//               name="distance"
//               value={userSettings.matchPreferences.distance}
//               onChange={handleInputChange}
//             />
//           </label>
//         </div>

//         {/* Image Upload */}
//         <div className="section">
//           <h2>Upload Images</h2>
//           <label>
//             Profile Images (5 max):
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               onChange={(e) => handleImageUpload(e, "profileImages")}
//             />
//           </label>
//           <label>
//             Face Images (2 max):
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               onChange={(e) => handleImageUpload(e, "faceImages")}
//             />
//           </label>
//         </div>

//         <button type="submit" className="save-button" disabled={uploading}>
//           {uploading ? "Saving..." : "Save Settings"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SettingsView;


// import React, { useState, useEffect } from "react";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { db, auth, storage } from "./firebase";
// import "./styles/SettingsView.css";

// const SettingsView = () => {
//   const [userSettings, setUserSettings] = useState({
//     emailNotifications: true,
//     pushNotifications: true,
//     matchPreferences: {
//       gender: "All",
//       ageRange: [18, 99],
//       distance: 50,
//     },
//     profileImages: [],
//     faceImages: [],
//   });

//   const [loading, setLoading] = useState(false); // Loading state
//   const currentUserId = auth.currentUser?.uid;

//   useEffect(() => {
//     const fetchUserSettings = async () => {
//       try {
//         const docRef = doc(db, "people", currentUserId);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           const data = docSnap.data();
//           setUserSettings({
//             emailNotifications: data.emailNotifications || true,
//             pushNotifications: data.pushNotifications || true,
//             matchPreferences: data.matchPreferences || {
//               gender: "All",
//               ageRange: [18, 99],
//               distance: 50,
//             },
//             profileImages: data.profileImages || [],
//             faceImages: data.faceImages || [],
//           });
//         } else {
//           console.error("No such document!");
//         }
//       } catch (error) {
//         console.error("Error fetching user settings:", error);
//       }
//     };

//     if (currentUserId) fetchUserSettings();
//   }, [currentUserId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     setUserSettings((prev) => ({
//       ...prev,
//       matchPreferences: { ...prev.matchPreferences, [name]: value },
//     }));
//   };

//   const handleNotificationChange = (e) => {
//     const { name, checked } = e.target;

//     setUserSettings((prev) => ({
//       ...prev,
//       [name]: checked,
//     }));
//   };

//   const handleImageUpload = async (e, type) => {
//     const files = Array.from(e.target.files);
//     const maxFiles = type === "profileImages" ? 5 : 2;

//     if (files.length + userSettings[type].length > maxFiles) {
//       alert(`You can only upload up to ${maxFiles} ${type}.`);
//       return;
//     }

//     try {
//       const uploadedUrls = await Promise.all(
//         files.map(async (file) => {
//           const uniqueName = `${Date.now()}_${file.name}`;
//           const storageRef = ref(storage, `${currentUserId}/${type}/${uniqueName}`);
//           await uploadBytes(storageRef, file);
//           return await getDownloadURL(storageRef);
//         })
//       );

//       setUserSettings((prev) => ({
//         ...prev,
//         [type]: [...prev[type], ...uploadedUrls],
//       }));
//     } catch (error) {
//       console.error(`Error uploading ${type}:`, error);
//       alert(`Failed to upload ${type}. Please try again.`);
//     }
//   };

//   const handleImageDelete = (index, type) => {
//     setUserSettings((prev) => ({
//       ...prev,
//       [type]: prev[type].filter((_, i) => i !== index),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true); // Set loading state
//     try {
//       const docRef = doc(db, "people", currentUserId);

//       await updateDoc(docRef, {
//         emailNotifications: userSettings.emailNotifications,
//         pushNotifications: userSettings.pushNotifications,
//         matchPreferences: userSettings.matchPreferences,
//         profileImages: userSettings.profileImages,
//         faceImages: userSettings.faceImages,
//       });

//       alert("Settings updated successfully!");
//     } catch (error) {
//       console.error("Error updating settings:", error);
//       alert("Failed to save settings. Please try again.");
//     } finally {
//       setLoading(false); // Stop loading state
//     }
//   };

//   return (
//     <div className="settings-container">
//       <h1>Settings</h1>
//       <form className="settings-form" onSubmit={handleSubmit}>
//         {/* Notifications */}
//         <div className="section">
//           <h2>Notification Preferences</h2>
//           <label>
//             <input
//               type="checkbox"
//               name="emailNotifications"
//               checked={userSettings.emailNotifications}
//               onChange={handleNotificationChange}
//             />
//             Email Notifications
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               name="pushNotifications"
//               checked={userSettings.pushNotifications}
//               onChange={handleNotificationChange}
//             />
//             Push Notifications
//           </label>
//         </div>

//         {/* Match Preferences */}
//         <div className="section">
//           <h2>Match Preferences</h2>
//           <label>
//             Gender:
//             <select
//               name="gender"
//               value={userSettings.matchPreferences.gender}
//               onChange={handleInputChange}
//             >
//               <option value="All">All</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Non-binary">Non-binary</option>
//             </select>
//           </label>
//           <label>
//             Age Range:
//             <input
//               type="number"
//               name="ageRange"
//               value={userSettings.matchPreferences.ageRange[0]}
//               onChange={(e) =>
//                 setUserSettings((prev) => ({
//                   ...prev,
//                   matchPreferences: {
//                     ...prev.matchPreferences,
//                     ageRange: [
//                       parseInt(e.target.value, 10),
//                       prev.matchPreferences.ageRange[1],
//                     ],
//                   },
//                 }))
//               }
//               placeholder="Min Age"
//             />
//             -
//             <input
//               type="number"
//               name="ageRange"
//               value={userSettings.matchPreferences.ageRange[1]}
//               onChange={(e) =>
//                 setUserSettings((prev) => ({
//                   ...prev,
//                   matchPreferences: {
//                     ...prev.matchPreferences,
//                     ageRange: [
//                       prev.matchPreferences.ageRange[0],
//                       parseInt(e.target.value, 10),
//                     ],
//                   },
//                 }))
//               }
//               placeholder="Max Age"
//             />
//           </label>
//           <label>
//             Distance (km):
//             <input
//               type="number"
//               name="distance"
//               value={userSettings.matchPreferences.distance}
//               onChange={handleInputChange}
//             />
//           </label>
//         </div>

//         {/* Image Upload with Previews */}
//         <div className="section">
//           <h2>Upload Images</h2>
//           <label>
//             Profile Images (5 max):
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               onChange={(e) => handleImageUpload(e, "profileImages")}
//             />
//           </label>
//           <div className="image-preview">
//             {userSettings.profileImages.map((url, index) => (
//               <div key={index} className="image-container">
//                 <img src={url} alt={`Profile ${index}`} />
//                 <button
//                   type="button"
//                   className="delete-button"
//                   onClick={() => handleImageDelete(index, "profileImages")}
//                 >
//                   ✕
//                 </button>
//               </div>
//             ))}
//           </div>

//           <label>
//             Face Images (2 max):
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               onChange={(e) => handleImageUpload(e, "faceImages")}
//             />
//           </label>
//           <div className="image-preview">
//             {userSettings.faceImages.map((url, index) => (
//               <div key={index} className="image-container">
//                 <img src={url} alt={`Face ${index}`} />
//                 <button
//                   type="button"
//                   className="delete-button"
//                   onClick={() => handleImageDelete(index, "faceImages")}
//                 >
//                   ✕
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         <button type="submit" className="save-button" disabled={loading}>
//           {loading ? "Saving..." : "Save Settings"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SettingsView;


// import React, { useState, useEffect } from "react";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { auth, db } from "./firebase"; // Adjust paths to your Firebase config
// import "./styles/SettingsView.css"; // Add your own CSS

// const SettingsView = () => {
//   const [settings, setSettings] = useState({
//     notifications: {
//       email: true,
//       push: true,
//     },
//     matchPreferences: {
//       gender: "All",
//       ages: [], // Stores two numbers
//       distance: 50,
//     },
//   });
//   const [loading, setLoading] = useState(true);
//   const currentUserId = auth.currentUser?.uid;

//   useEffect(() => {
//     const fetchSettings = async () => {
//       try {
//         const docRef = doc(db, "people", currentUserId);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           const data = docSnap.data();
//           setSettings({
//             notifications: data.notifications || {
//               email: true,
//               push: true,
//             },
//             matchPreferences: data.matchPreferences || {
//               gender: "All",
//               ages: [],
//               distance: 50,
//             },
//           });
//         } else {
//           console.error("No settings found!");
//         }
//       } catch (error) {
//         console.error("Error fetching settings:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (currentUserId) {
//       fetchSettings();
//     }
//   }, [currentUserId]);

//   const handleNotificationChange = (e) => {
//     const { name, checked } = e.target;
//     setSettings((prev) => ({
//       ...prev,
//       notifications: {
//         ...prev.notifications,
//         [name]: checked,
//       },
//     }));
//   };

//   const handleMatchPreferencesChange = (e) => {
//     const { name, value } = e.target;
//     setSettings((prev) => ({
//       ...prev,
//       matchPreferences: {
//         ...prev.matchPreferences,
//         [name]: value,
//       },
//     }));
//   };

//   const handleAgesChange = (index, value) => {
//     const newAges = [...settings.matchPreferences.ages];
//     newAges[index] = parseInt(value, 10) || ""; // Ensure number or empty
//     setSettings((prev) => ({
//       ...prev,
//       matchPreferences: {
//         ...prev.matchPreferences,
//         ages: newAges,
//       },
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const docRef = doc(db, "people", currentUserId);

//       await updateDoc(docRef, {
//         notifications: settings.notifications,
//         matchPreferences: settings.matchPreferences,
//       });

//       alert("Settings updated successfully!");
//     } catch (error) {
//       console.error("Error updating settings:", error);
//       alert("Failed to update settings. Please try again.");
//     }
//   };

//   if (loading) {
//     return <div className="loading">Loading settings...</div>;
//   }

//   return (
//     <div className="settings-container">
//       <h1>Settings</h1>
//       <form className="settings-form" onSubmit={handleSubmit}>
//         <div className="section">
//           <h2>Notifications</h2>
//           <label>
//             <input
//               type="checkbox"
//               name="email"
//               checked={settings.notifications.email}
//               onChange={handleNotificationChange}
//             />
//             Email Notifications
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               name="push"
//               checked={settings.notifications.push}
//               onChange={handleNotificationChange}
//             />
//             Push Notifications
//           </label>
//         </div>

//         <div className="section">
//           <h2>Match Filtering Preferences</h2>
//           <label>
//             Gender:
//             <select
//               name="gender"
//               value={settings.matchPreferences.gender}
//               onChange={handleMatchPreferencesChange}
//             >
//               <option value="All">All</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Non-binary">Non-binary</option>
//             </select>
//           </label>
//           <label>
//             Ages:
//             <input
//               type="number"
//               value={settings.matchPreferences.ages[0] || ""}
//               onChange={(e) => handleAgesChange(0, e.target.value)}
//               placeholder="Age 1"
//             />
//             <input
//               type="number"
//               value={settings.matchPreferences.ages[1] || ""}
//               onChange={(e) => handleAgesChange(1, e.target.value)}
//               placeholder="Age 2"
//             />
//           </label>
//           <label>
//             Distance (km):
//             <input
//               type="number"
//               name="distance"
//               value={settings.matchPreferences.distance}
//               onChange={handleMatchPreferencesChange}
//             />
//           </label>
          
//         </div>
      
//         <button type="submit" className="save-button">
//           Save Changes
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SettingsView;



import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebase"; // Adjust paths to your Firebase config
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./styles/SettingsView.css"; // Add your own CSS

const SettingsView = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
    },
    matchPreferences: {
      gender: "All",
      ages: [], // Stores two numbers
      distance: 50,
    },
  });
  const [loading, setLoading] = useState(true);
  const currentUserId = auth.currentUser?.uid;
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, "people", currentUserId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setSettings({
            notifications: data.notifications || {
              email: true,
              push: true,
            },
            matchPreferences: data.matchPreferences || {
              gender: "All",
              ages: [],
              distance: 50,
            },
          });
        } else {
          console.error("No settings found!");
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUserId) {
      fetchSettings();
    }
  }, [currentUserId]);

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [name]: checked,
      },
    }));
  };

  const handleMatchPreferencesChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      matchPreferences: {
        ...prev.matchPreferences,
        [name]: value,
      },
    }));
  };

  const handleAgesChange = (index, value) => {
    const newAges = [...settings.matchPreferences.ages];
    newAges[index] = parseInt(value, 10) || ""; // Ensure number or empty
    setSettings((prev) => ({
      ...prev,
      matchPreferences: {
        ...prev.matchPreferences,
        ages: newAges,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "people", currentUserId);

      await updateDoc(docRef, {
        notifications: settings.notifications,
        matchPreferences: settings.matchPreferences,
      });

      alert("Settings updated successfully!");
      navigate("/profileview"); // Redirect to ProfileView after saving changes
    } catch (error) {
      console.error("Error updating settings:", error);
      alert("Failed to update settings. Please try again.");
    }
  };

  if (loading) {
    return <div className="loading">Loading settings...</div>;
  }

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <form className="settings-form" onSubmit={handleSubmit}>
        <div className="section">
          <h2>Notifications</h2>
          <label>
            <input
              type="checkbox"
              name="email"
              checked={settings.notifications.email}
              onChange={handleNotificationChange}
            />
            Email Notifications
          </label>
          <label>
            <input
              type="checkbox"
              name="push"
              checked={settings.notifications.push}
              onChange={handleNotificationChange}
            />
            Push Notifications
          </label>
        </div>

        <div className="section">
          <h2>Match Filtering Preferences</h2>
          <label>
            Gender:
            <select
              name="gender"
              value={settings.matchPreferences.gender}
              onChange={handleMatchPreferencesChange}
            >
              <option value="All">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
            </select>
          </label>
          <label>
            Ages:
            <input
              type="number"
              value={settings.matchPreferences.ages[0] || ""}
              onChange={(e) => handleAgesChange(0, e.target.value)}
              placeholder="Age 1"
            />
            <input
              type="number"
              value={settings.matchPreferences.ages[1] || ""}
              onChange={(e) => handleAgesChange(1, e.target.value)}
              placeholder="Age 2"
            />
          </label>
          <label>
            Distance (km):
            <input
              type="number"
              name="distance"
              value={settings.matchPreferences.distance}
              onChange={handleMatchPreferencesChange}
            />
          </label>
        </div>

        <button type="submit" className="save-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default SettingsView;
