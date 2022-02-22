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
          <PortfolioItem
            src={require("../assets/img/ambient-mode.jpg")}
            title="Ambient mode on Samsung TV (2018 CES)"
            message="Ambient Mode allows you to experience beauty right in your home. Customise your TV to showcase gorgeous wallpapers or bits of information when it is not in use."
          />
          <PortfolioItem
            src={require("../assets/img/AR-VR.jpg")}
            title=" Metaverse environment, Spatial "
            message="Spatial is dedicated to helping creators and brands build their own spaces in the metaverse to share culture together. We empower our users to leverage their beautiful spaces to share eye popping content, build a tight knit community, and drive meaningful sales of their creative works and products. We also empower our users to create beautiful and functional 3D spaces that they can mint as NFTs and sell/rent to others looking to host mind blowing experiences."
          />
          <PortfolioItem
            src={require("../assets/img/MediaSquare_Video_Thumb.jpg")}
            title="Samsung Media Square"
            message="MediaSquare is Samsung’s vision for how multiple people can share and experience media content in a connected environment, where smart phones and wearables can easily connect with TV. Through a playful and interactive game-like user interface, friends and family can enjoy and share a highly personalized media experience. Jinha Lee, a principal researcher and head of Interaction group talks about the MediaSquare vision, demonstrating different scenarios and the new design approach that brings such experience to life."
          />
          <PortfolioItem
            src={require("../assets/img/Experience.jpg")}
            title="AR/VR experiences"
            message="Experience on AR / VR"
          />
          <PortfolioItem
            src={require("../assets/img/Coding Edu.jpg")}
            title="Coding Education for Kids"
            message="Coding Education (WIP)"
          />
          <PortfolioItem
            src={require("../assets/img/Shader Test.PNG")}
            title="Shader"
            message="Shader experiment with three.js / Unity shader / glsl / hlsl and so on"
          />
        </div>
      </div>
    </section>
  );
};
