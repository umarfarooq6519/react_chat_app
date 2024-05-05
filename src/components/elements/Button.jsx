export default function Button({ onclick, styling, text, icon }) {
  return (
    <button
      onClick={onclick}
      className={`hover:bg-base-300 duration-200 bg-base-100 text-base-content px-3 py-2 rounded-xl w-full ${styling}`}
    >
      {icon}
      {text}
    </button>
  );
}
