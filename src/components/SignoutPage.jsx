import { signOut } from "firebase/auth";

// #################### SignOut ####################
function SignOut({ auth }) {
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
    <section>
      <button
        onClick={handleSignout}
        className="border border-gray-400 px-3 py-2 p-2 rounded-xl"
      >
        <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i>
        Sign out
      </button>
    </section>
  );
}

export default SignOut;
