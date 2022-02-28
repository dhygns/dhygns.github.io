import { Button, Container, Row, Col } from "react-bootstrap";
import { Divider } from "./Divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

export const About = () => {
  return (
    <section className="page-section bg-primary text-white mb-0" id="about">
      <Container>
        <h2 className="page-section-heading text-center text-uppercase text-white">
          About ME (WIP)
        </h2>
        <Divider className="divider-custom divider-light" />
        <Row>
          <Col lg="4" className="ms-auto">
            <p className="lead">
              Currently working as a client engineer at Spatial.io as an early
              member of the company, and has been in charge of overall planning
              and development of the Spatial app.
            </p>
          </Col>
          <Col lg="4" className="me-auto">
            <p className="lead">
              I'm a full-stack engineer who actively communicates with backend
              engineers using not only frontend engineering such as react /
              react native / unity / and shaders, but also project management
              using github and linear, and UI tools such as Retool.{" "}
            </p>
          </Col>
        </Row>
        <div className="text-center mt-4">
          <Button
            variant="outline-light"
            size="lg"
            href="https://drive.google.com/uc?id=1PiM-BpU0Qw4dYN2NxXvC_P2ZrXf91xM-&export=download"
          >
            <FontAwesomeIcon className="me-2" icon={faDownload} />
            Download Resume.PDF
          </Button>
        </div>
      </Container>
    </section>
  );
};
