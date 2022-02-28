import { Container } from "react-bootstrap";
import classes from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={`${classes.masthead} bg-primary text-white text-center`}>
      <Container className="d-flex align-items-center flex-column">
        <img
          className={`${classes.avatar} mb-5`}
          src={require("../assets/img/Profile Picture.jpg")}
          alt="..."
        />
        <iframe
          title="https://dhygns.github.io/interactive-traditional-art-paint/"
          className={classes.background}
          src="https://dhygns.github.io/interactive-traditional-art-paint/"
        />
        <p className={`${classes.subheading} font-weight-light mb-0`}>
          AR / VR and ... Metaverse Engineer
        </p>
      </Container>
    </header>
  );
};
