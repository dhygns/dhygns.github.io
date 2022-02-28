import { Button, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithubSquare,
  faInstagramSquare,
  faLinkedinIn,
  faDribbbleSquare,
} from "@fortawesome/free-brands-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface FooterSocialButtonProps {
  href: string;
  icon: IconProp;
}

export const FooterSocialButton = (props: FooterSocialButtonProps) => {
  const { href, icon } = props;
  return (
    <Button variant="social" className="mx-1 p-2" href={href}>
      <FontAwesomeIcon
        style={{
          width: "3rem",
          height: "3rem",
        }}
        icon={icon}
      />
    </Button>
  );
};

export const Footer = () => {
  return (
    <footer className="footer text-center">
      <Container>
        <Row>
          <Col lg="4" className="mb-5 mb-lg-0">
            <h4 className="text-uppercase mb-4">Location</h4>
            <p className="lead mb-0">New York, United States</p>
          </Col>
          <Col lg="4" className="mb-5 mb-lg-0">
            <h4 className="text-uppercase mb-4">Around the Web</h4>
            <FooterSocialButton
              href="https://github.com/dhygns"
              icon={faGithubSquare}
            />
            <FooterSocialButton
              href="https://www.instagram.com/atoh_fx/"
              icon={faInstagramSquare}
            />
            <FooterSocialButton
              href="https://www.linkedin.com/in/donghyeon-kim-20a336145/"
              icon={faLinkedinIn}
            />
            <FooterSocialButton href="#!" icon={faDribbbleSquare} />
          </Col>
          <Col lg="4">
            <h4 className="text-uppercase mb-4">Hi! 안녕하세요!</h4>
            <p className="lead mb-0">Welcome any kind of your contact : )</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
