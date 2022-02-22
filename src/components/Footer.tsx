import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faTwitterSquare, faLinkedinIn, faDribbbleSquare } from '@fortawesome/free-brands-svg-icons'

export const Footer = () => {
  return (
    <footer className="footer text-center">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-5 mb-lg-0">
            <h4 className="text-uppercase mb-4">Location</h4>
            <p className="lead mb-0">Woodbury, NY 11797</p>
          </div>
          <div className="col-lg-4 mb-5 mb-lg-0">
            <h4 className="text-uppercase mb-4">Around the Web</h4>
            <a className="btn btn-outline-light btn-social mx-1" href="#!">
              <FontAwesomeIcon icon={faFacebookSquare}/>
            </a>
            <a className="btn btn-outline-light btn-social mx-1" href="#!">
              <FontAwesomeIcon icon={faTwitterSquare}/>
            </a>
            <a className="btn btn-outline-light btn-social mx-1" href="#!">
              <FontAwesomeIcon icon={faLinkedinIn}/>
            </a>
            <a className="btn btn-outline-light btn-social mx-1" href="#!">
              <FontAwesomeIcon icon={faDribbbleSquare}/>
            </a>
          </div>
          <div className="col-lg-4">
            <h4 className="text-uppercase mb-4">About Me</h4>
            <p className="lead mb-0">
              Welcome any kind of contact, please don't hesitate to text me :)
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
