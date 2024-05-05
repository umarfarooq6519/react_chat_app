// ########## Components ############
import Chats from "./components/Chats";
// import BottomBar from "./components/BottomBar";
// import TopBar from "./components/TopBar";

// ########## firebase ############
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { useAuthState } from "react-firebase-hooks/auth";
// import { useCollectionData } from "react-firebase-hooks/firestore";
import LoginPage from "./components/LoginPage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_BG_bB1JrUoJvq-d8c-RMS9dn1eAjNfw",
  authDomain: "chatapp52-c4bd1.firebaseapp.com",
  projectId: "chatapp52-c4bd1",
  storageBucket: "chatapp52-c4bd1.appspot.com",
  messagingSenderId: "805566105982",
  appId: "1:805566105982:web:ad6813e37b627a60dd4b2f",
};

const app = initializeApp(firebaseConfig);

function App() {
  const auth = getAuth(app);
  // const db = getFirestore(app);

  const [user] = useAuthState(auth);

  return (
    <section className="md:flex justify-center text-[1.1em] min-h-screen">
      {user ? <Chats /> : <LoginPage />}

      {/* <TopBar />
      <Chats />
      <BottomBar /> */}
    </section>
  );
}

export default App;
