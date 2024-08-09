import Navagation from "./Navagation";
import Hero from "./Hero";

function App() {
  return (
    <section className="flex h-svh relative">
      <Navagation />
      <Hero />
      <div className="absolute top-5 right-5 p-5 bg-slate-400 text-white rounded-md">
        LOGO
      </div>
    </section>
  );
}

export default App;
