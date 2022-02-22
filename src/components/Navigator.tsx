import { Nav } from "react-bootstrap";

interface NaviatorButtonProps {
  title : string,
  href : string
}

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
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          Menu
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ms-auto">
            <NavigatorButton title="Portfolio" href="#portfolio"/>
            <NavigatorButton title="About" href="#about"/>
            <NavigatorButton title="Contact" href="#contact"/>
          </ul>
        </div>
      </div>
    </Nav>
  );
};
