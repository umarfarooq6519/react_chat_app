export default function EmptyChat() {
    return (
      <span className="text-center leading-relaxed w-full">
        <p>{"It's empty here :("}</p>
        <p>
          Click on <i className="fa-solid fa-pen-to-square mx-1"></i> to start a
          new chat.
        </p>
      </span>
    );
  }