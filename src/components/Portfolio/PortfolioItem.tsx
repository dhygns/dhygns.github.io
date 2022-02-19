import React from "react";
import { Modal } from "react-bootstrap";

export interface PortfolioModalProps {
  visible: boolean;
  onHide: any;
  src: string;
}

export interface PortfolioProps {
  src: string;
}

export const PortfolioModal = (props: PortfolioModalProps) => {
  const { src, visible, onHide } = props;
  return (
    <Modal className="portfolio-modal fade" dialogClassName="modal-xl" show={visible} onHide={onHide}>
      <div className="modal-header border-0">
        <button className="btn-close" onClick={onHide}></button>
      </div>
      <div className="modal-body text-center pb-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h2 className="portfolio-modal-title text-secondary text-uppercase mb-0">
                Ambient mode on Samsung TV (2018 CES)
              </h2>
              <div className="divider-custom">
                <div className="divider-custom-line"></div>
                <div className="divider-custom-line"></div>
              </div>
              <img className="img-fluid rounded mb-5" src={src} alt="..." />
              <p className="mb-4">
                Ambient Mode allows you to experience beauty right in your home.
                Customise your TV to showcase gorgeous wallpapers or bits of
                information when it is not in use.
              </p>
              <button className="btn btn-primary" onClick={onHide}>
                <i className="fas fa-times fa-fw">close</i>
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
  const { src } = props;
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
        onHide={() => setVisible(false)}
      />
    </div>
  );
};
