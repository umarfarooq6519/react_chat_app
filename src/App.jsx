import BottomBar from "./components/BottomBar";
import Chats from "./components/Chats";
import TopBar from "./components/TopBar";

function App() {
  return (
    <section className="md:flex justify-center text-[1.1em] min-h-screen">
      <TopBar />
      <Chats />
      <BottomBar />
    </section>
  );
}

export default App;
