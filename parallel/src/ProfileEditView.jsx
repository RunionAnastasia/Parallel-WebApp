// import React, { useState, useEffect } from "react";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { db, auth } from "./firebase";
// import "./styles/ProfileEditView.css"; // Add your own styles here
// import { useNavigate } from "react-router-dom";

// const ProfileEditView = () => {
//   const [userData, setUserData] = useState({
//     name: "",
//     age: "",
//     bio: "",
//     interests: "",
//   });
//   const currentUserId = auth.currentUser?.uid; // Get the current user's ID
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const docRef = doc(db, "people", currentUserId);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           const data = docSnap.data();
//           setUserData({
//             name: data.name || "",
//             age: data.age || "",
//             bio: data.bio || "",
//             interests: data.interests?.join(", ") || "",
//           });
//         } else {
//           console.error("No such document!");
//         }
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//       }
//     };

//     if (currentUserId) {
//       fetchUserProfile();
//     }
//   }, [currentUserId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const docRef = doc(db, "people", currentUserId);

//       // Update Firestore document
//       await updateDoc(docRef, {
//         name: userData.name,
//         age: parseInt(userData.age, 10),
//         bio: userData.bio,
//         interests: userData.interests.split(",").map((interest) => interest.trim()),
//       });

//       console.log("Profile updated successfully!");
//       navigate("/profile"); // Redirect to the profile view page
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };

//   return (
//     <div className="profile-edit-container">
//       <h1>Edit Your Profile</h1>
//       <form className="profile-edit-form" onSubmit={handleSubmit}>
//         <label htmlFor="name">Name</label>
//         <input
//           type="text"
//           id="name"
//           name="name"
//           value={userData.name}
//           onChange={handleInputChange}
//           required
//         />

//         <label htmlFor="age">Age</label>
//         <input
//           type="number"
//           id="age"
//           name="age"
//           value={userData.age}
//           onChange={handleInputChange}
//           required
//         />

//         <label htmlFor="bio">Bio</label>
//         <textarea
//           id="bio"
//           name="bio"
//           value={userData.bio}
//           onChange={handleInputChange}
//         ></textarea>

//         <label htmlFor="interests">Interests (comma-separated)</label>
//         <input
//           type="text"
//           id="interests"
//           name="interests"
//           value={userData.interests}
//           onChange={handleInputChange}
//         />

//         <button type="submit" className="save-button">
//           Save Changes
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ProfileEditView;


import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, auth } from "./firebase";
import "./styles/ProfileEditView.css";
import { useNavigate, Link } from "react-router-dom";

const storage = getStorage();

const ProfileEditView = () => {
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    bio: "",
    interests: "",
    profileImages: [],
    selfImages: [],
  });
  const [loading, setLoading] = useState(false); // Track submission/loading state
  const currentUserId = auth.currentUser?.uid;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const docRef = doc(db, "people", currentUserId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData({
            name: data.name || "",
            age: data.age || "",
            bio: data.bio || "",
            interests: data.interests?.join(", ") || "",
            profileImages: data.profileImages || [],
            selfImages: data.selfImages || [],
          });
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (currentUserId) {
      fetchUserProfile();
    }
  }, [currentUserId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e, type) => {
    const files = Array.from(e.target.files);
    const maxImages = type === "profileImages" ? 5 : 2;

    if (files.length + userData[type].length > maxImages) {
      alert(`You can upload up to ${maxImages} images for ${type}.`);
      return;
    }

    try {
      const uploadedUrls = await Promise.all(
        files.map(async (file) => {
          const uniqueName = `${Date.now()}_${file.name}`;
          const storageRef = ref(storage, `${currentUserId}/${type}/${uniqueName}`);
          await uploadBytes(storageRef, file);
          return await getDownloadURL(storageRef);
        })
      );

      setUserData((prev) => ({
        ...prev,
        [type]: [...prev[type], ...uploadedUrls],
      }));
    } catch (error) {
      console.error(`Error uploading ${type}:`, error);
      alert(`Failed to upload ${type}. Please try again.`);
    }
  };

  const handleImageDelete = (index, type) => {
    setUserData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const docRef = doc(db, "people", currentUserId);

      await updateDoc(docRef, {
        name: userData.name,
        age: parseInt(userData.age, 10),
        bio: userData.bio,
        interests: userData.interests.split(",").map((interest) => interest.trim()),
        profileImages: userData.profileImages,
        selfImages: userData.selfImages,
      });

      alert("Profile updated successfully!");
      navigate("/profileview");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error saving your profile. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="profile-edit-container">
      <h1>Edit Your Profile</h1>
      <form className="profile-edit-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={userData.name}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          name="age"
          value={userData.age}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          name="bio"
          value={userData.bio}
          onChange={handleInputChange}
        ></textarea>

        <label htmlFor="interests">Interests (comma-separated)</label>
        <input
          type="text"
          id="interests"
          name="interests"
          value={userData.interests}
          onChange={handleInputChange}
        />

        <label>Profile Images (5 max)</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleImageUpload(e, "profileImages")}
        />
        <div className="image-preview">
          {userData.profileImages.map((url, index) => (
            <div key={index} className="image-container">
              <img src={url} alt={`Profile ${index}`} />
              <button
                type="button"
                className="delete-button"
                onClick={() => handleImageDelete(index, "profileImages")}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <label>Self Images (2 max)</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleImageUpload(e, "selfImages")}
        />
        <div className="image-preview">
          {userData.selfImages.map((url, index) => (
            <div key={index} className="image-container">
              <img src={url} alt={`Self ${index}`} />
              <button
                type="button"
                className="delete-button"
                onClick={() => handleImageDelete(index, "selfImages")}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <Link to="/profileview" className="profile-button">
          Back to Profile
        </Link>
        <button type="submit" className="save-button" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default ProfileEditView;


// import React, { useState, useEffect } from "react";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { db, auth } from "./firebase";
// import "./styles/ProfileEditView.css";
// import { useNavigate } from "react-router-dom";

// const storage = getStorage();

// const ProfileEditView = () => {
//   const [userData, setUserData] = useState({
//     name: "",
//     age: "",
//     bio: "",
//     interests: "",
//     profileImages: [],
//     selfImages: [],
//   });
//   const currentUserId = auth.currentUser?.uid;
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const docRef = doc(db, "people", currentUserId);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           const data = docSnap.data();
//           setUserData({
//             name: data.name || "",
//             age: data.age || "",
//             bio: data.bio || "",
//             interests: data.interests?.join(", ") || "",
//             profileImages: data.profileImages || [],
//             selfImages: data.selfImages || [],
//           });
//         } else {
//           console.error("No such document!");
//         }
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//       }
//     };

//     if (currentUserId) {
//       fetchUserProfile();
//     }
//   }, [currentUserId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageUpload = async (e, type) => {
//     const files = Array.from(e.target.files);
//     const maxImages = type === "profileImages" ? 5 : 2;

//     if (files.length + userData[type].length > maxImages) {
//       alert(`You can upload up to ${maxImages} images for ${type}.`);
//       return;
//     }

//     try {
//       const uploadedUrls = await Promise.all(
//         files.map(async (file) => {
//           const storageRef = ref(storage, `${currentUserId}/${type}/${file.name}`);
//           await uploadBytes(storageRef, file);
//           return await getDownloadURL(storageRef);
//         })
//       );

//       setUserData((prev) => ({
//         ...prev,
//         [type]: [...prev[type], ...uploadedUrls],
//       }));
//     } catch (error) {
//       console.error("Error uploading images:", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const docRef = doc(db, "people", currentUserId);

//       await updateDoc(docRef, {
//         name: userData.name,
//         age: parseInt(userData.age, 10),
//         bio: userData.bio,
//         interests: userData.interests.split(",").map((interest) => interest.trim()),
//         profileImages: userData.profileImages,
//         selfImages: userData.selfImages,
//       });

//       alert("Profile updated successfully!");
//       navigate("/profile");
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };

//   return (
//     <div className="profile-edit-container">
//       <h1>Edit Your Profile</h1>
//       <form className="profile-edit-form" onSubmit={handleSubmit}>
//         <label htmlFor="name">Name</label>
//         <input
//           type="text"
//           id="name"
//           name="name"
//           value={userData.name}
//           onChange={handleInputChange}
//           required
//         />

//         <label htmlFor="age">Age</label>
//         <input
//           type="number"
//           id="age"
//           name="age"
//           value={userData.age}
//           onChange={handleInputChange}
//           required
//         />

//         <label htmlFor="bio">Bio</label>
//         <textarea
//           id="bio"
//           name="bio"
//           value={userData.bio}
//           onChange={handleInputChange}
//         ></textarea>

//         <label htmlFor="interests">Interests (comma-separated)</label>
//         <input
//           type="text"
//           id="interests"
//           name="interests"
//           value={userData.interests}
//           onChange={handleInputChange}
//         />

//         <label>Profile Images (5 max)</label>
//         <input
//           type="file"
//           multiple
//           accept="image/*"
//           onChange={(e) => handleImageUpload(e, "profileImages")}
//         />
//         <div className="image-preview">
//           {userData.profileImages.map((url, index) => (
//             <img key={index} src={url} alt={`Profile ${index}`} />
//           ))}
//         </div>

//         <label>Self Images (2 max)</label>
//         <input
//           type="file"
//           multiple
//           accept="image/*"
//           onChange={(e) => handleImageUpload(e, "selfImages")}
//         />
//         <div className="image-preview">
//           {userData.selfImages.map((url, index) => (
//             <img key={index} src={url} alt={`Self ${index}`} />
//           ))}
//         </div>

//         <button type="submit" className="save-button">
//           Save Changes
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ProfileEditView;



// import React, { useState, useEffect } from "react";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { db, auth, storage } from "./firebase";
// import "./styles/ProfileEditView.css";
// import { useNavigate } from "react-router-dom";

// const ProfileEditView = () => {
//   const [userData, setUserData] = useState({
//     name: "",
//     age: "",
//     bio: "",
//     interests: "",
//     profileImages: [],
//     selfImages: [],
//   });

//   const currentUserId = auth.currentUser?.uid; // Get the current user's ID
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const docRef = doc(db, "people", currentUserId);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           const data = docSnap.data();
//           setUserData({
//             name: data.name || "",
//             age: data.age || "",
//             bio: data.bio || "",
//             interests: data.interests?.join(", ") || "",
//             profileImages: data.profileImages || [],
//             selfImages: data.selfImages || [],
//           });
//         } else {
//           console.error("No such document!");
//         }
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//       }
//     };

//     if (currentUserId) {
//       fetchUserProfile();
//     }
//   }, [currentUserId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageUpload = async (e, type) => {
//     const files = Array.from(e.target.files);
//     const maxFiles = type === "profileImages" ? 5 : 2;

//     if (userData[type].length + files.length > maxFiles) {
//       alert(`You can only upload up to ${maxFiles} ${type === "profileImages" ? "profile" : "self"} images.`);
//       return;
//     }

//     try {
//       const uploadedUrls = await Promise.all(
//         files.map(async (file) => {
//           const storageRef = ref(storage, `${currentUserId}/${type}/${file.name}`);
//           await uploadBytes(storageRef, file);
//           return await getDownloadURL(storageRef);
//         })
//       );

//       setUserData((prev) => ({
//         ...prev,
//         [type]: [...prev[type], ...uploadedUrls],
//       }));
//     } catch (error) {
//       console.error("Error uploading images:", error.message);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const docRef = doc(db, "people", currentUserId);

//       // Update Firestore document
//       await updateDoc(docRef, {
//         name: userData.name,
//         age: parseInt(userData.age, 10),
//         bio: userData.bio,
//         interests: userData.interests.split(",").map((interest) => interest.trim()),
//         profileImages: userData.profileImages,
//         selfImages: userData.selfImages,
//       });

//       console.log("Profile updated successfully!");
//       navigate("/profile"); // Redirect to the profile view page
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };

//   return (
//     <div className="profile-edit-container">
//       <h1>Edit Your Profile</h1>
//       <form className="profile-edit-form" onSubmit={handleSubmit}>
//         <label htmlFor="name">Name</label>
//         <input
//           type="text"
//           id="name"
//           name="name"
//           value={userData.name}
//           onChange={handleInputChange}
//           required
//         />

//         <label htmlFor="age">Age</label>
//         <input
//           type="number"
//           id="age"
//           name="age"
//           value={userData.age}
//           onChange={handleInputChange}
//           required
//         />

//         <label htmlFor="bio">Bio</label>
//         <textarea
//           id="bio"
//           name="bio"
//           value={userData.bio}
//           onChange={handleInputChange}
//         ></textarea>

//         <label htmlFor="interests">Interests (comma-separated)</label>
//         <input
//           type="text"
//           id="interests"
//           name="interests"
//           value={userData.interests}
//           onChange={handleInputChange}
//         />

//         <label>Profile Images (First image is your profile icon)</label>
//         <input
//           type="file"
//           multiple
//           accept="image/*"
//           onChange={(e) => handleImageUpload(e, "profileImages")}
//         />
//         <div className="image-preview">
//           {userData.profileImages.map((url, index) => (
//             <img
//               key={index}
//               src={url}
//               alt={`Profile ${index}`}
//               style={index === 0 ? { border: "3px solid green" } : {}}
//             />
//           ))}
//         </div>

//         <label>Self-Images (2 max)</label>
//         <input
//           type="file"
//           multiple
//           accept="image/*"
//           onChange={(e) => handleImageUpload(e, "selfImages")}
//         />
//         <div className="image-preview">
//           {userData.selfImages.map((url, index) => (
//             <img key={index} src={url} alt={`Self ${index}`} />
//           ))}
//         </div>

//         <button type="submit" className="save-button">
//           Save Changes
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ProfileEditView;
