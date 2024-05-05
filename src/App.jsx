import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  // signOut,
  // signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import SignIn from "./components/SignInPage";
import SignOut from "./components/SignoutPage";

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

  return (
    <section className="h-screen bg-neutral p-3 text-base-100 text-base flex gap-3 justify-center items-center">
      <div className="sidebar flex-1 md:max-w-60 lg:max-w-xs h-full">
        {currentUser ? (
          <SignOut auth={auth} userPhoto={userPhoto} userName={userName} />
        ) : (
          <SignIn auth={auth} provider={provider} />
        )}
      </div>

      <div className="chat-content rounded-xl bg-base-100 text-base-content flex-1 flex justify-center items-center h-full">
        {currentUser ? "Start a Chat!" : "Please Login to continue!"}
      </div>
    </section>
  );
}

export default App;
