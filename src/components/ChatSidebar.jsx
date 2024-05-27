import { signOut } from "firebase/auth";
import Button from "./elements/Button";

function ChatSidebar({ auth, userPhoto, userName }) {
  // Sign out of google
  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log("Error -> " + error);
      });
  };

  return (
    <section className="Signout flex flex-col justify-between h-full gap-3">
      <div className="flex flex-col gap-3 h-full">
        {/* sidebar header */}
        <div className="sidebar-header flex justify-between items-center">
          <span className="flex items-center gap-3">
            {userPhoto !== null ? (
              <img
                src={userPhoto}
                alt="photo"
                className="w-11 h-11 rounded-box"
              />
            ) : null}
            <h1 className="text-lg">{userName}</h1>
          </span>
          <button
            onClick={onclick}
            className={`hover:bg-base-300 duration-200 bg-base-100 text-textdark px-3 py-2 rounded-xl w-fit`}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        </div>

        {/* sidebar buttons */}
        <div className="flex flex-col gap-3 py-4">
          <Button
            text="Recent Chats"
            icon={<i className="fa-solid fa-comments mr-2"></i>}
          />
          <Button
            text="Archived Chats"
            icon={<i className="fa-solid fa-box-archive mr-2"></i>}
          />
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
