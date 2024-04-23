import BottomBar from "./components/BottomBar";
import Chats from "./components/Chats";
import TopBar from "./components/TopBar";

function App() {
  return (
    <section className="max-w-lg text-lg min-h-screen">
      <TopBar />
      <Chats />
      <BottomBar />
    </section>
  );
}

export default App;
