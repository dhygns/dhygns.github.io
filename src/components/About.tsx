import { Button, Container, Row, Col } from "react-bootstrap";
import { Divider } from "./Divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

export const About = () => {
  return (
    <section className="page-section bg-primary text-white mb-0" id="about">
      <Container>
        <h2 className="page-section-heading text-center text-uppercase text-white">
          About ME
        </h2>
        <Divider className="divider-custom divider-light" />
        <Row>
          <Col lg="4" className="ms-auto">
            <p className="lead mb-1 text-secondary">교육</p>
            <p className="lead mb-3">
              한국산업기술대학교
              <br />
              삼성 소프트웨어 멤버십
              <br />
              모두의 연구소
              <br />
            </p>
            <p className="lead mb-1 text-secondary">경력</p>
            <p className="lead mb-3">
              삼성전자 (2015. 01 ~ 2018. 02)
              <br />- Expert programmer
              <br />
              Spatial (2018. 02 ~ present)
              <br />- Client prgrammer
              <br />
            </p>
          </Col>
          <Col lg="4" className="me-auto">
            <p className="lead mb-1 text-secondary">스킬</p>
            <p className="lead mb-3">
              C#, C++, C, Javascript, Typescript ...
              <br />
              Unity3D, React, ReactNative ... <br />
              Various Shader languages ... <br />
              Github, Linear.app, Fork ... <br />
              Azure Devops <br/>
              Arduino
            </p>
            <p className="lead mb-1 text-secondary">플랫폼</p>
            <p className="lead mb-3">
              Hololens 1, Hololens 2, Magic Leap, Nreal ... <br />
              Oculus 1, Oculus 2, range of PC VR ... <br/>
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
