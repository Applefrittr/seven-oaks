import Sidebar from "./Sidebar";
import RouteSwitch from "./RouteSwitch";

function App() {
  return (
    <section className="flex h-svh relative">
      <RouteSwitch />
      <Sidebar />
    </section>
  );
}

export default App;
