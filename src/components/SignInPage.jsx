import { signInWithPopup } from "firebase/auth";

// #################### SignIn ####################
function SignIn({ auth, provider }) {
  // Calls google login page
  const handleSignin = async (e) => {
    e.preventDefault();
    const user = await signInWithPopup(auth, provider);
    console.log(user);
  };

  return (
    <section>
      <button
        onClick={handleSignin}
        className="border border-gray-400 px-3 py-2 rounded-xl"
      >
        <i className="fa-brands fa-google mr-2"></i>
        Sign in with Google
      </button>
    </section>
  );
}

export default SignIn;
