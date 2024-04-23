import user_group from "../assets/user_group.svg";
import archive from "../assets/archive.svg";

export default function TopBar() {
  return (
    <section className="fixed bg-base-100 max-w-2xl z-50 top-0 flex w-full justify-between items-center px-5 py-3 ">
      <div className="flex justify-between items-center w-full ">
        <img src={user_group} alt="contacts" className="w-6 h-6" />
        <h1 className="font-semibold font-[khand]">RECENT MESSAGES</h1>
        <img src={archive} alt="archive" className="w-6 h-6" />
      </div>
    </section>
  );
}
