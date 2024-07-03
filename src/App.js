import logo from "./logo.svg";
import "./App.css";
import TempertureChart from "./Components/TempertureChart";

import MenuBar from "./Components/Menus/Menu";
import Countries from "./Components/Countries";

function App() {
  return (
    <div className="App">
      <MenuBar />
      <TempertureChart />

      <header className="App-header"></header>
    </div>
  );
}

export default App;
