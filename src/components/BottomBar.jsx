import settings from "../assets/settings.svg";
import search from "../assets/search.svg";
import add from "../assets/add.svg";
import gallery from "../assets/gallery.svg";
import hash from "../assets/hash.svg";

export default function BottomBar() {
  return (
    <section className="fixed bottom-5 max-w-2xl w-full flex justify-center items-center">
      <div className="bg-neutral flex items-center rounded-full justify-center w-fit gap-6 py-3 px-4">
        <img src={search} alt="search" className="w-9 h-9" />
        <img src={add} alt="add" className="w-9 h-9" />
        <img src={settings} alt="setting" className="w-9 h-9" />
      </div>
    </section>
  );
}
