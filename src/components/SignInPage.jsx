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
    <section className="flex flex-col justify-center h-full w-full gap-3">
      {/* <span>
        <h1 className="text-xl font-medium">
         Sign In
        </h1>
      </span> */}
      <button
        onClick={handleSignin}
        className="bg-base-100 text-neutral px-3 py-2 rounded-xl"
      >
        <i className="fa-brands fa-google mr-2"></i>
        Sign in with Google
      </button>
    </section>
  );
}

export default SignIn;
