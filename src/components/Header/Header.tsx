import { Container } from "react-bootstrap";
import { HeaderNameLabel } from "./HeaderNameLabel"
import classes from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={`${classes.masthead} bg-primary text-white text-center`}>
      <Container className="d-flex align-items-center flex-column">
        <img
          className={`${classes.avatar} mb-5`}
          src={require("../../assets/img/Profile Picture.jpg")}
          alt="..."
        />
        <HeaderNameLabel />
        <p className={`${classes.subheading} font-weight-light mb-3`}>
          Metaverse engineer, between all Lifes
        </p>
        <p className="lead">
          다양한 분야의 사람들과의 커뮤니케이션을 항상 고민하는 풀스텍 / 그래픽스 개발자
          입니다.<br/> "느낌의 수치화"와 "추상의 정규화"는 제 강점이며 개발과 삶을
          연결하는 핵심 키입니다.
        </p>
      </Container>
    </header>
  );
};
