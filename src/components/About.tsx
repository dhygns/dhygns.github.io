import { Divider } from "./Divider";
export const About = () => {
  return (
    <section className="page-section bg-primary text-white mb-0" id="about">
      <div className="container">
        <h2 className="page-section-heading text-center text-uppercase text-white">
          About ME
        </h2>
        <div className="divider-custom divider-light">
          <Divider />
        </div>
        <div className="row">
          <div className="col-lg-4 ms-auto">
            <p className="lead">
              Currently working as a client engineer at Spatial.io as an early
              member of the company, and has been in charge of overall planning
              and development of the Spatial app.
            </p>
          </div>
          <div className="col-lg-4 me-auto">
            <p className="lead">
              It's a full-stack engineer who actively communicates with backend
              engineers using not only frontend engineering such as react /
              react native / unity / and shaders, but also project management
              using github and linear, and UI tools such as Retool.{" "}
            </p>
          </div>
        </div>
        <div className="text-center mt-4">
          <a
            className="btn btn-xl btn-outline-light"
            href="https://drive.google.com/uc?id=1PiM-BpU0Qw4dYN2NxXvC_P2ZrXf91xM-&export=download"
          >
            <i className="fas fa-download me-2"></i>
            Download Resume.PDF
          </a>
        </div>
      </div>
    </section>
  );
};
