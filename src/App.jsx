import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  // signOut,
  // signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import SignedOut from "./components/SignedOutPage";
import SignedIn from "./components/SignedInPage";
import EmptyChat from "./components/EmptyChat";

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

// #################### App ####################
function App() {
  // Current User info states
  const [currentUser, setCurrentUser] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setUserName(user.displayName);
        setUserPhoto(user.photoURL);
        console.log("AuthStateChange: Signed in " + user.email);
      } else {
        setUserName(null);
        setCurrentUser(null);
        console.log("AuthStateChange: Signed out");
      }
    });
  }, []);

  // sidebar hide / show state
  const [sidebar, setSidebar] = useState(true);
  const sidebarState = sidebar ? "flex-1" : "hidden";

  useEffect(() => {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia("(max-width: 767px)");
      setSidebar(!mediaQuery.matches); // Set initial sidebar state based on screen width
    }
  }, []);

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

  return (
    <section className="h-screen bg-neutral p-3 text-base-100 text-base flex gap-3 justify-center items-center">
      {/* sidebar content */}
      <div
        className={`sidebar ${sidebarState} md:max-w-60 lg:max-w-xs h-full `}
      >
        {/* <span className="flex justify-end">{sidebarArrow}</span> */}
        {currentUser ? (
          <SignedIn auth={auth} userPhoto={userPhoto} userName={userName} />
        ) : (
          <SignedOut auth={auth} provider={provider} />
        )}
      </div>

      {/* chat content */}
      <div
        className={`chat-content p-3 lg:px-5 rounded-xl bg-base-100 text-base-content ${
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
            <EmptyChat />
          ) : (
            <span className="text-center leading-relaxed w-full">
              Please login to continue.
            </span>
          )}
        </section>
      </div>
    </section>
  );
}

export default App;
