import { Nav } from "react-bootstrap";
import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

interface NavigatorButtonGroupProps {
  visible : boolean,
}

interface NaviatorButtonProps {
  title : string,
  href : string
}

export const NavigatorButtonGroup = (props: NavigatorButtonGroupProps) => {
  
  const {visible} = props;
  return (
    <div className="collapse navbar-collapse" style={{display : visible ? "block" : "none"}}>
      <ul className="navbar-nav ms-auto">
        <NavigatorButton title="Portfolio" href="#portfolio" />
        <NavigatorButton title="About" href="#about" />
        <NavigatorButton title="Contact" href="#contact" />
      </ul>
    </div>
  );
};

export const NavigatorButton = (props: NaviatorButtonProps) => {
  const { title, href} = props;
  return (
    <li className="nav-item mx-0 mx-lg-1">
      <a className="nav-link py-3 px-0 px-lg-3 rounded" href={href}>
        {title}
      </a>
    </li>
  );
};

export const Navigator = () => {
  

  const [menuOn, setMenuOn] = React.useState<boolean>(false);

  return (
    <Nav
      className="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top"
      id="mainNav"
    >
      <div className="container">
        <a className="navbar-brand" href="#page-top">
          DH Kim
        </a>
        <button
          className="navbar-toggler text-uppercase font-weight-bold bg-primary text-white rounded"
          type="button"
          onClick={() => setMenuOn(!menuOn)}
        >
          Menu
          <FontAwesomeIcon className="px-1" icon={faBars}/>
        </button>
        <NavigatorButtonGroup visible={menuOn}></NavigatorButtonGroup>
      </div>
    </Nav>
  );
};
