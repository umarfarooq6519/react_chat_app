import { useState, useEffect } from "react";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import ChatInput from "./elements/ChatInput";

function ChatRoom({ db, userPhoto, user }) {
  // State to store messages
  const [messages, setMessages] = useState([]);

  // Fetch messages when component mounts and return unsubscribe function
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "messages"), (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(fetchedMessages);
      console.log("Messages fetched and updated");
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [db]); // Empty array means this effect runs once when component mounts

  //chat input message state
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const msgCopy = msg;
    setMsg(""); // Clear input field after submission

    //check if only whitespace in input
    if (msgCopy.trim() === "") {
      console.log("Empty message cannot be submitted!");
      return false;
    }

    try {
      const docRef = await addDoc(collection(db, "messages"), {
        createdAt: new Date(),
        text: msgCopy,
        uid: user.uid,
        photoURL: userPhoto,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const sortedMessages = messages.sort((a, b) => a.createdAt - b.createdAt);
  const checkMSG = (message) => {
    return message.uid == user.uid ? "justify-end" : "justify-start";
  };

  const displayIMG = (message) => {
    return (
      <img
        key={message.uid}
        src={message.photoURL}
        alt="dp"
        className="w-10 h-10 rounded-box"
      />
    );
  };

  const IncomingMsgs = (
    <span className={`flex flex-col border w-full gap-4`}>
      {sortedMessages.map((message) => (
        <span
          key={message.createdAt}
          className={`flex ${checkMSG(message)} gap-3`}
        >
          {/* incoming side image */}
          {user.uid !== message.uid ? displayIMG(message) : null}
          <span
            className="bg-neutral-content rounded-box px-3 py-1 flex items-center"
            key={message.id}
          >
            {message.text}
          </span>
          {user.uid == message.uid ? displayIMG(message) : null}
        </span>
      ))}
    </span>
  );
  // const OutgoingMsgs = (
  //   <span className="flex border items-end flex-col gap-4">
  //     {sortedMessages.map((message) => (
  //       <span key={message.uid} className="flex gap-3">
  //         <span className="bg-gray-400 px-3 py-2 rounded-box" key={message.id}>
  //           {message.text}
  //         </span>
  //         <img
  //           key={message.uid}
  //           src={message.photoURL}
  //           alt="dp"
  //           className="w-10 h-10 rounded-box"
  //         />
  //       </span>
  //     ))}
  //   </span>
  // );

  return (
    <section className="flex flex-col gap-4 h-full w-full justify-end items-start">
      <div className="flex w-full h-full justify-between items-end gap-2">
        {IncomingMsgs}
        {/* {OutgoingMsgs} */}
      </div>
      <ChatInput handleSubmit={handleSubmit} msg={msg} setMsg={setMsg} />
    </section>
  );
}

export default ChatRoom;
