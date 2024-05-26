import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import SignInSidebar from "./components/SignInSidebar";
import ChatSidebar from "./components/ChatSidebar";
import ChatRoom from "./components/ChatRoom";
// import EmptyChat from "./components/EmptyChat";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyB_BG_bB1JrUoJvq-d8c-RMS9dn1eAjNfw",
  authDomain: "chatapp52-c4bd1.firebaseapp.com",
  projectId: "chatapp52-c4bd1",
  storageBucket: "chatapp52-c4bd1.appspot.com",
  messagingSenderId: "805566105982",
  appId: "1:805566105982:web:ad6813e37b627a60dd4b2f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
// Initialize Cloud Firestore
const db = getFirestore(app);

// #################### App ####################
function App() {
  // Current User info states
  const [currentUser, setCurrentUser] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);
  const [uid, setUID] = useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setUserName(user.displayName);
        setUserPhoto(user.photoURL);
        setUID(user.uid);
        console.log(
          "AuthStateChange: Signed in " + user.email + " UID: " + user.uid
        );
      } else {
        setUserName(null);
        setCurrentUser(null);
        setUID(null);
        console.log("AuthStateChange: Signed out");
      }
    });
  }, []);

  //checks if authenticated then loads users data
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     setCurrentUser(user);
  //     setUserName(user.displayName);
  //     setUserPhoto(user.photoURL);
  //   }
  // });

  // sidebar hide / show state
  const [sidebar, setSidebar] = useState(true);
  const sidebarState = sidebar ? "flex-1" : "hidden";

  const sidebarArrow = (
    <button
      type="button"
      onClick={() => setSidebar(!sidebar)}
      className={`w-fit`}
    >
      {sidebar ? (
        <i className="fa-solid fa-chevron-left fa-lg"></i>
      ) : (
        <i className="fa-solid fa-chevron-right fa-lg"></i>
      )}
    </button>
  );

  function ChatSection() {
    return (
      <div
        className={`chat-content p-3 lg:px-5 rounded-box bg-base-100 text-textdark ${
          sidebar ? "flex-0" : "flex-1"
        } md:flex-1 flex justify-center items-center h-full`}
      >
        <span className="py-3 md:hidden">{sidebarArrow}</span>
        {/* show / hide main content based on sidebar state */}
        <section
          className={`flex ${
            sidebar ? "max-md:hidden" : ""
          } justify-center items-center w-full h-full`}
        >
          {currentUser ? (
            // <EmptyChat />
            <ChatRoom db={db} userPhoto={userPhoto} user={currentUser} />
          ) : (
            <span className="text-center leading-relaxed w-full">
              Please login to continue.
            </span>
          )}
        </section>
      </div>
    );
  }

  return (
    <section className="h-screen bg-[#24252D] p-4 text-base-100 text-base flex gap-3 justify-center items-center">
      {/* sidebar content */}
      <div
        className={`sidebar ${sidebarState} py-1 md:max-w-60 lg:max-w-xs h-full `}
      >
        {/* <span className="flex justify-end">{sidebarArrow}</span> */}
        {currentUser ? (
          <ChatSidebar
            auth={auth}
            userPhoto={userPhoto}
            userName={userName}
            firestore={db}
          />
        ) : (
          <SignInSidebar auth={auth} provider={provider} />
        )}
      </div>
      <ChatSection />
    </section>
  );
}

export default App;
