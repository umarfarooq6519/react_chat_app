import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import {
  query,
  where,
  getDocs,
  addDoc,
  collection,
  onSnapshot,
} from "firebase/firestore";
import Button from "./elements/Button";

function ChatSidebar({ auth, db, user }) {
  const [chats, setChats] = useState([]);

  // Fetch chats from Firestore
  useEffect(() => {
    const q = query(
      collection(db, "chats"),
      where("user1.uid", "==", user.uid)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedChats = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChats(fetchedChats);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [db, user.uid]);

  // Sign out of Google
  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log("Error -> " + error);
      });
  };

  let otherUserGmail = null;

  const newUserInput = async () => {
    otherUserGmail = prompt("Enter user Gmail address to chat with them.");
    const otherUser = await fetchUserUidByGmail(db, otherUserGmail);

    if (otherUser) {
      await createChatDocument(db, user, otherUser);
      console.log("New User Gmail: " + otherUserGmail);
    }
  };

  async function fetchUserUidByGmail(db, gmail) {
    if (gmail.trim() === "") return null;
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", gmail));

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        console.log(userDoc.data());
        return userDoc.data(); // Return the user document data
      } else {
        console.log("No user found with the given credentials");
        alert("NO USER FOUND with given credentials.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user UID:", error);
      return null;
    }
  }

  async function createChatDocument(db, currentUser, otherUser) {
    try {
      // Create chat document for current user
      const docRef1 = await addDoc(collection(db, "chats"), {
        user1: {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        },
        user2: {
          uid: otherUser.uid,
          email: otherUser.email,
          displayName: otherUser.displayName,
          photoURL: otherUser.photoURL,
        },
        createdAt: new Date(),
      });
      console.log("Chat document created with ID: ", docRef1.id);

      // Create chat document for other user
      const docRef2 = await addDoc(collection(db, "chats"), {
        user1: {
          uid: otherUser.uid,
          email: otherUser.email,
          displayName: otherUser.displayName,
          photoURL: otherUser.photoURL,
        },
        user2: {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        },
        createdAt: new Date(),
      });
      console.log("Chat document created with ID: ", docRef2.id);
    } catch (error) {
      console.error("Error creating chat document: ", error);
    }
  }

  return (
    <section className="Signout flex flex-col justify-between h-full gap-3">
      <div className="flex flex-col gap-3 h-full">
        {/* sidebar header */}
        <div className="sidebar-header flex justify-between items-center">
          <span className="flex items-center gap-3">
            {user.photoURL !== null ? (
              <img
                src={user.photoURL}
                alt="photo"
                className="w-11 h-11 rounded-box"
              />
            ) : null}
            <h1 className="text-lg">{user.displayName}</h1>
          </span>
          <button
            onClick={() => newUserInput()}
            className={`hover:bg-base-300 duration-200 bg-base-100 text-textdark px-3 py-2 rounded-xl w-fit`}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        </div>
        <h2>Recent Chats</h2>

        {/* chat list */}
        <div className="flex flex-col gap-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className="flex items-center gap-2 p-2 hover:opacity-80 rounded-lg"
            >
              <img
                src={chat.user2.photoURL}
                alt={chat.user2.displayName}
                className="w-8 h-8 rounded-full"
              />
              <span>{chat.user2.displayName}</span>
            </div>
          ))}
        </div>
      </div>

      {/* sidebar footer */}
      <Button
        onclick={handleSignout}
        text="Settings"
        icon={<i className="fa-solid fa-gear mr-2"></i>}
      />
      <Button
        onclick={handleSignout}
        text="Sign out"
        icon={<i className="fa-solid fa-arrow-right-from-bracket mr-2"></i>}
      />
    </section>
  );
}

export default ChatSidebar;
