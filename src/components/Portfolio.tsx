import { PortfolioItem } from "./Portfolio/PortfolioItem";

export const Portfolio = () => {
  return (
    <section className="page-section portfolio" id="portfolio">
      <div className="container">
        <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">
          Portfolio
        </h2>
        <div className="divider-custom">
          <div className="divider-custom-line"></div>
          <div className="divider-custom-line"></div>
        </div>
        <div className="row justify-content-center">
          <PortfolioItem src="ambient-mode.jpg" />
          <PortfolioItem src="AR-VR.jpg" />
          <PortfolioItem src="MediaSquare_Video_Thumb.jpg" />
          <PortfolioItem src="Experience.jpg" />
          <PortfolioItem src="Coding Edu.jpg" />
          <PortfolioItem src="Shader Test.PNG" />
        </div>
      </div>
    </section>
  );
};
