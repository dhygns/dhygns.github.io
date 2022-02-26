import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithubSquare, faInstagramSquare, faLinkedinIn, faDribbbleSquare } from '@fortawesome/free-brands-svg-icons'

export const Footer = () => {
  const iconStyle = { 
    width:"3rem", height:"3rem"
  }
  return (
    <footer className="footer text-center">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-5 mb-lg-0">
            <h4 className="text-uppercase mb-4">Location</h4>
            <p className="lead mb-0">New York, United States</p>
          </div>
          <div className="col-lg-4 mb-5 mb-lg-0">
            <h4 className="text-uppercase mb-4">Around the Web</h4>
            <a className="btn btn-social mx-1 p-2" href="https://github.com/dhygns">
              <FontAwesomeIcon style={iconStyle} icon={faGithubSquare}/>
            </a>
            <a className="btn btn-social mx-1 p-2" href="https://www.instagram.com/atoh_fx/">
              <FontAwesomeIcon style={iconStyle}  icon={faInstagramSquare}/>
            </a>
            <a className="btn btn-social mx-1 p-2" href="https://www.linkedin.com/in/donghyeon-kim-20a336145/">
              <FontAwesomeIcon style={iconStyle}  icon={faLinkedinIn}/>
            </a>
            <a className="btn btn-social mx-1 p-2" href="#!">
              <FontAwesomeIcon style={iconStyle}  icon={faDribbbleSquare}/>
            </a>
          </div>
          <div className="col-lg-4">
            <h4 className="text-uppercase mb-4">Hi! I'm busy... but</h4>
            <p className="lead mb-0">
              Welcome any kind of your contact : )
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
