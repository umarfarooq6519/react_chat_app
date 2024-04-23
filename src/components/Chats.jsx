// import { useId } from "react";
import check from "../assets/check.svg";
import star from "../assets/star.svg";

function Chat() {
  return (
    <span className="chat max-w-2xl flex items-center py-4">
      <div className="avatar">
        <div className="w-16 rounded-full">
          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <div className="flex flex-col truncate w-full">
        <span className="flex justify-between">
          <h2 className="font-medium">Alex Walker</h2>
          <span className="flex items-center gap-1">
            <img src={star} alt="star" className="w-4 h-4" />
            <p className="text-sm">8:22 am</p>
          </span>
        </span>

        <span className="flex justify-start items-center gap-0.5">
          <img src={check} alt="check" className="w-4 h-4" />
          <p className="text-sm truncate">
            Hey! I think we should hangout today. Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Ipsam, veritatis?
          </p>
        </span>
      </div>
    </span>
  );
}

export default function Chats() {
  return (
    <section className="flex flex-col pt-14 px-3">
      <div className="flex-1 overflow-y">
        <Chat />
        <Chat />
        <Chat />
      </div>
    </section>
  );
}
