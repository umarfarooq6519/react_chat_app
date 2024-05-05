export default function LoginPage() {
  return (
    <div className="flex items-center justify-center">
      <button className="px-4 py-2 border flex gap-2 border-neutral rounded-lg hover:shadow-lg transition duration-150">
        <img
          className="w-6 h-6"
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          loading="lazy"
          alt="google logo"
        />
        <span>Login with Google</span>
      </button>
    </div>
  );
}
