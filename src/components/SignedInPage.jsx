import { signOut } from "firebase/auth";
import Button from "./elements/Button";

// #################### SignOut ####################
function SignedIn({ auth, userPhoto, userName }) {
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
        <div className="sidebar-header flex justify-between items-center">
          <span className="flex items-center gap-3">
            {userPhoto !== null ? (
              <img
                src={userPhoto}
                alt="userPhoto"
                className="w-11 h-11 rounded-box"
              />
            ) : null}
            <h1 className="text-lg">{userName}</h1>
          </span>
          <span>
            <Button icon={<i className="fa-solid fa-pen-to-square"></i>} />
          </span>
        </div>
        <div className="flex flex-col gap-3 py-4">
          <Button
            text="Recent Chats"
            icon={<i className="fa-solid fa-comments mr-2"></i>}
          />
          <Button
            text="Deleted Chats"
            icon={<i className="fa-solid fa-trash mr-2"></i>}
          />
        </div>
      </div>

      <Button
        onclick={handleSignout}
        text="Sign out"
        icon={<i className="fa-solid fa-arrow-right-from-bracket mr-2"></i>}
      />
    </section>
  );
}

export default SignedIn;
