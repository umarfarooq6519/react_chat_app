import { signInWithPopup } from "firebase/auth";
import Button from "./elements/Button";

// #################### SignIn ####################
function SignInSidebar({ auth, provider }) {
  // Calls google login page
  const handleSignin = async (e) => {
    e.preventDefault();
    const user = await signInWithPopup(auth, provider);
    console.log(user);
  };

  return (
    <section className="flex flex-col justify-center h-full w-full gap-3">
      <Button
        text="Sign in with Google"
        icon={<i className="fa-brands fa-google mr-2"></i>}
        onclick={handleSignin}
      />
    </section>
  );
}

export default SignInSidebar;
