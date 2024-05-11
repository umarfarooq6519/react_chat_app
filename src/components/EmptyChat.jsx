import ChatInput from "./elements/ChatInput";

export default function EmptyChat() {
  return (
    <span className="flex flex-col justify-end border h-full text-center leading-relaxed w-full">
      <ChatInput />
    </span>
  );
}

function Empty() {
  return (
    <section className="border">
      <p>
        {"It's empty here :("}
        <br />
        Click on <i className="fa-solid fa-pen-to-square mx-1"></i> to start a
        new chat.
      </p>
    </section>
  );
}
