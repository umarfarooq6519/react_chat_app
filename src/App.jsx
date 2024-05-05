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

// // #################### SignOut ####################
// const SignOut = ({ username }) => {
//   // Sign out of google
//   const handleSignout = () => {
//     signOut(auth)
//       .then(() => {
//         console.log("Signed out successfully");
//       })
//       .catch((error) => {
//         console.log("Error -> " + error);
//       });
//   };

//   return (
//     <section>
//       <button onClick={handleSignout}>Sign Out</button>
//       <p>User: {username ? username : "Signed out"}</p>
//     </section>
//   );
// };

// // #################### SignIn ####################
// const SignIn = () => {
//   // Calls google login page
//   const onSubmit = async (e) => {
//     e.preventDefault();
//     const user = await signInWithPopup(auth, provider);
//     console.log(user);
//   };

//   return (
//     <section>
//       <button onClick={onSubmit}>Sign in with Google</button>
//     </section>
//   );
// };

// #################### App ####################
function App() {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName);
        console.log("AuthStateChange: Signed in " + user.email);
      } else {
        setUserName(null);
        console.log("AuthStateChange: Signed out");
      }
    });
  }, []);

  return (
    <section className="h-screen flex flex-col gap-3 justify-center items-center">
      <p>User: {userName ? userName : "Signed out"}</p>
      <SignIn auth={auth} provider={provider} />
      <SignOut auth={auth} />
    </section>
  );
}

export default App;
