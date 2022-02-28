import { NavItem, NavLink, Navbar, Container } from "react-bootstrap";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

interface NaviatorButtonProps {
  title: string;
  href: string;
}

export const NavButton = (props: NaviatorButtonProps) => {
  const { title, href } = props;
  return (
    <NavItem className="mx-0 mx-lg-1">
      <NavLink
        color="white"
        className={"py-3 px-0 px-lg-3 rounded"}
        href={href}
      >
        {title}
      </NavLink>
    </NavItem>
  );
};

export const Navigator = () => {
  const [scrollPosition, setScrollPosition] = React.useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Navbar
      expand="lg"
      sticky="top"
      bg="secondary"
      variant="dark"
      className={scrollPosition > 0.01 ? "navbar-shrink" : ""}
      id="mainNav"
    >
      <Container>
        <Navbar.Brand href="#page-top">DH Kim, Metaverse Engineer</Navbar.Brand>
        <Navbar.Toggle
          className="bg-primary text-white"
          color="primary"
          style={{
            textTransform: "uppercase",
            fontWeight: "bold",
            borderRadius: "0.5rem",
          }}
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
          type="button"
        >
          Menu
          <FontAwesomeIcon className="px-1" icon={faBars} />
        </Navbar.Toggle>
        <Navbar.Collapse id="navbarResponsive">
          <ul className="navbar-nav ms-auto">
            <NavButton title="Portfolio" href="#portfolio" />
            <NavButton title="About" href="#about" />
            <NavButton title="Contact" href="#contact" />
          </ul>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
