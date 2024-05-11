import { useState, useEffect } from "react";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import ChatInput from "./elements/ChatInput";

function ChatRoom({ db, userPhoto }) {
  // State to store messages
  const [messages, setMessages] = useState([]);

  // Function to fetch messages from Firestore and listen for real-time updates
  const fetchMessages = () => {
    const updateMsgs = onSnapshot(collection(db, "messages"), (snapshot) => {
      const fetchedMessages = [];
      snapshot.forEach((doc) => {
        fetchedMessages.push({ id: doc.id, ...doc.data() });
      });
      setMessages(fetchedMessages);
    });

    // Return the updateMsgs function to stop listening when component unmounts
    return updateMsgs;
  };

  // Fetch messages when component mounts and return unsubscribe function
  useEffect(() => {
    const unsubscribe = fetchMessages();
    return unsubscribe;
  }, []);

  //chat input message state
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "messages"), {
        createdAt: new Date(),
        text: msg,
        uid: Math.random() * 100,
        photoURL: userPhoto,
      });
      setMsg(""); // Clear input field after submission
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const sortedMessages = messages.sort((a, b) => a.createdAt - b.createdAt);

  const IncomingMsgs = (
    <span className="flex flex-col gap-4">
      {sortedMessages.map((message) => (
        <span key={message.uid} className="flex gap-3">
          <img
            key={message.uid}
            src={message.photoURL}
            alt="dp"
            className="w-10 h-10 rounded-box"
          />
          <span className="bg-gray-400 px-3 py-2 rounded-box" key={message.id}>
            {message.text}
          </span>
        </span>
      ))}
    </span>
  );

  return (
    <section className="border flex flex-col gap-4 h-full w-full justify-end items-start">
      <div className="flex border justify-center items-center gap-2">
        {IncomingMsgs}
      </div>
      <ChatInput handleSubmit={handleSubmit} msg={msg} setMsg={setMsg} />
    </section>
  );
}

export default ChatRoom;
