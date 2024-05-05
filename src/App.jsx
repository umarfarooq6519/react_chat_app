// Firebase imports
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

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

// #################### SignIn ####################
function SignIn() {
  // Calls google login page
  const onSubmit = async (e) => {
    e.preventDefault();
    const user = await signInWithPopup(auth, provider);
  };

  return (
    <section>
      <button onClick={onSubmit}>Sign in with Google</button>
    </section>
  );
}

// #################### App ####################
function App() {
  return (
    <section>
      <SignIn />
    </section>
  );
}

export default App;
