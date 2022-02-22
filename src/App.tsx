import React from "react";
import "./App.scss";
import { Navigator } from "./components/Navigator";
import { Header } from "./components/Header";
import { Portfolio } from "./components/Portfolio";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div id="page-top">
      <Navigator></Navigator>
      <Header></Header>
      <Portfolio></Portfolio>
      <About></About>
      <Contact></Contact>
      <Footer></Footer>
      <div className="copyright py-4 text-center text-white">
        <div className="container">
          <small>Copyright &copy; dhygns.github.io 2022</small>
        </div>
      </div>
    </div>
  );
}

export default App;
