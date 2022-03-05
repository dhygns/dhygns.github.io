import "./App.scss";
import { Container } from "react-bootstrap";

import { Navigator } from "./components/Navigator";
import { Header } from "./components/Header/Header";
import { Portfolio } from "./components/Portfolio/Portfolio";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Notification } from "./components/Notification";

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
        <Container>
          <small>Copyright &copy; dhygns.github.io 2022</small>
        </Container>
      </div>
      <Notification></Notification>
    </div>

  );
}

export default App;
