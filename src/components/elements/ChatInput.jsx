export default function ChatInput() {
  return (
    <div className="chat-input flex gap-3 lg:gap-5 w-full items-center">
      <span className="flex gap-3 lg:gap-5 items-center">
        <button type="button">
          <i className="fa-solid fa-image fa-lg"></i>
        </button>
        <button type="button">
          <i className="fa-solid fa-paperclip fa-lg"></i>
        </button>
      </span>
      <input
        type="text"
        className="border border-neutral-content rounded-xl py-2.5 px-3 grow"
        placeholder="Start typing..."
      />
      <button type="button">
        <i className="fa-solid fa-paper-plane fa-lg"></i>
      </button>
    </div>
  );
}
