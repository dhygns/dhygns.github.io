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
              <i className="fab fa-fw fa-facebook-f"></i>
            </a>
            <a className="btn btn-outline-light btn-social mx-1" href="#!">
              <i className="fab fa-fw fa-twitter"></i>
            </a>
            <a className="btn btn-outline-light btn-social mx-1" href="#!">
              <i className="fab fa-fw fa-linkedin-in"></i>
            </a>
            <a className="btn btn-outline-light btn-social mx-1" href="#!">
              <i className="fab fa-fw fa-dribbble"></i>
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
