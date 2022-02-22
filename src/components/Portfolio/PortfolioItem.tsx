import React from "react";
import { Modal } from "react-bootstrap";
import { Divider } from "./../Divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons'
export interface PortfolioModalProps {
  visible: boolean;
  onHide: any;
  src: string;
  title: string;
  message: string;
}

export interface PortfolioProps {
  src: string;
  title: string;
  message: string;
}

export const PortfolioModal = (props: PortfolioModalProps) => {
  const { src, visible, onHide, title, message } = props;
  return (
    <Modal
      className="portfolio-modal fade"
      dialogClassName="modal-xl"
      show={visible}
      onHide={onHide}
    >
      <div className="modal-header border-0">
        <button className="btn-close" onClick={onHide}></button>
      </div>
      <div className="modal-body text-center pb-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h2 className="portfolio-modal-title text-secondary text-uppercase mb-0">
                {title}
              </h2>
              <Divider />
              <img className="img-fluid rounded mb-5" src={src} alt="..." />
              <p className="mb-4">{message}</p>
              <button className="btn btn-primary" onClick={onHide}>
                <FontAwesomeIcon className="px-1" icon={faXmark} />
                close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export const PortfolioItem = (props: PortfolioProps) => {
  const [visible, setVisible] = React.useState(false);
  const { src, title, message } = props;
  return (
    <div className="col-md-6 col-lg-4 mb-5">
      <div
        className="portfolio-item mx-auto"
        data-bs-toggle="modal"
        onClick={() => setVisible(true)}
      >
        <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
          <div className="portfolio-item-caption-content text-center text-white">
            <i className="fas fa-plus fa-3x"></i>
          </div>
        </div>
        <img className="portfolio-image" src={src} alt="..." />
      </div>
      <PortfolioModal
        src={src}
        visible={visible}
        title={title}
        message={message}
        onHide={() => setVisible(false)}
      />
    </div>
  );
};
