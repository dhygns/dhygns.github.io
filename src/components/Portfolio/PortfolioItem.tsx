import React from "react";
import {
  Modal,
  Row,
  Container,
  Button,
  CloseButton,
  Col,
  Card,
} from "react-bootstrap";
import AwesomeSlider from "react-awesome-slider";
import { Divider } from "./../Divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import "react-awesome-slider/dist/styles.css";

export interface PortfolioModalProps {
  visible: boolean;
  onHide: any;
  srcUrls: string[];
  title: string;
  message: string;
}

export const PortfolioModal = (props: PortfolioModalProps) => {
  const { srcUrls, visible, onHide, title, message } = props;
  return (
    <Modal
      className="portfolio-modal fade"
      dialogClassName="modal-xl"
      show={visible}
      onHide={onHide}
    >
      <Modal.Header className="border-0">
        <CloseButton onClick={onHide}></CloseButton>
      </Modal.Header>
      <Modal.Body className="text-center pb-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg="8">
              <h2 className="portfolio-modal-title text-secondary text-uppercase mb-0">
                {title}
              </h2>
              <Divider />
              <AwesomeSlider 
              className="mb-5"
                media={
                  srcUrls.map<{ source: string }>((source) => {
                    return { source };
                  }) ?? []
                }
              />
              <p className="mb-4 text-black">{message}</p>
              <Button variant="primary" onClick={onHide}>
                <FontAwesomeIcon className="px-1" icon={faXmark} />
                close
              </Button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export interface PortfolioProps {
  thumbnailSrc: string;
  srcUrls: string[];
  title: string;
  message: string;
}

export const PortfolioItem = (props: PortfolioProps) => {
  const [visible, setVisible] = React.useState(false);
  const { thumbnailSrc, srcUrls, title, message } = props;

  return (
    <Col md="6" lg="4" className="mb-5">
      <div
        className="portfolio-item mx-auto"
        data-bs-toggle="modal"
        onClick={() => setVisible(true)}
      >
        <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
          <div className="portfolio-item-caption-content text-center text-white">
            <Card.Title>{title}</Card.Title>
            <FontAwesomeIcon className="px-1" icon={faPlus} size="3x" />
          </div>
        </div>
        <img className="portfolio-image" src={thumbnailSrc} alt="..." />
      </div>
      <PortfolioModal
        srcUrls={srcUrls}
        visible={visible}
        title={title}
        message={message}
        onHide={() => setVisible(false)}
      />
    </Col>
  );
};
