import React from "react";
import "./App.scss";
import { Navigator } from "./components/Navigator";
import { Header } from "./components/Header";
import {Portfolio} from "./components/Portfolio"


function App() {
  return (
    <div>
      <Navigator></Navigator>
      <Header></Header>
      <Portfolio></Portfolio>
    </div>
  );
}

export default App;
