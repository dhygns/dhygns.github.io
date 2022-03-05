import { PortfolioItem } from "./PortfolioItem";
import { Container, Row } from "react-bootstrap";
import { Divider } from "../Divider";

export const Portfolio = () => {
  return (
    <section className="page-section portfolio" id="portfolio">
      <Container>
        <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">
          Projects
        </h2>
        <Divider />
        <Row className="justify-content-center">
          <PortfolioItem
            thumbnailSrc={require("../../assets/img/ambient-mode/thumbnail.jpg")}
            srcUrls={[
              require("../../assets/img/ambient-mode/thumbnail.jpg"),
              require("../../assets/img/ambient-mode/patent.PNG")
            ]}
            title="Ambient mode of Samsung TV"
            message={`
            다양한 Shader 기술이 집약된 해당 INVISIBLE ACT는 Samsung 2018 FIRST LOOK 행사에서 가장 큰 대중들의 환호를 받은 기술입니다. 주변 벽지의 패턴 / 색깔등을 조합하여 TV안의 검은 공간을 채우는 기술입니다. 
            현재 기술은 Samsung TV의 프리미엄 모델인 'THE FRAME TV'의 기능들중 하나로 포함되어있습니다. 대부분의 Color Calibration / Texture systhesis / Brightness balancing 등 다양한 그래픽스 분야를 맡아 팀원들과 진행하였습니다.
            `}
          />
          <PortfolioItem
            thumbnailSrc={require("../../assets/img/spatial/thumbnail.jpg")}
            srcUrls={[
              require("../../assets/img/spatial/thumbnail.jpg"),
              require("../../assets/img/spatial/outdoor.png"),
              require("../../assets/img/spatial/spatial-patent.PNG")
            ]}
            title="Spatial, Metaverse environment"
            message="
            Spatial은 세상의 많은 크레이터들을 메타버스 공간에서 하나로 묶어주는 멀티 플렛폼 메타버스 시스템입니다. 현재 Web / Oculus / Hololens / Mobile 등 다양한 플렛폼에서 서비스를 진행하고 있으며, 한동안은 AR 플렛폼인 Magic Leap / Nreal 등 에서도 지원을 했습니다. 이 앱에서 대부분의 UX / UI와 함께 Logic structuring을 진행하는 풀스택 / 클라이언트 앤지니어로서 프로젝트에 참여중입니다."
          />
          <PortfolioItem
            thumbnailSrc={require("../../assets/img/media-square/thumbnail.jpg")}
            srcUrls={[
              require("../../assets/img/media-square/thumbnail.jpg"),
              require("../../assets/img/media-square/media-square-phone.PNG"),
              require("../../assets/img/media-square/media-square-snapshot.PNG"),
              require("../../assets/img/media-square/media-square-snapshot2.PNG"),
              require("../../assets/img/media-square/media-square-snapshot3.PNG")
            ]}
            title="Samsung Media Square"
            message="CES 2017에서 선보인 이 프로젝트는 삼성에서 TV를 통해 IOT를 제어하는 가장 이상적인 가치를 프로토 타입을 통해 구현하였습니다. 해당 프로젝트는 React / openframeworks 등 다양한 UI 엔진을 통해 구현되었습니다."
          />
          <PortfolioItem
            thumbnailSrc={require("../../assets/img/air-quality-visualizer/air-quality-visualizer-website.PNG")}
            srcUrls={[
              require("../../assets/img/air-quality-visualizer/air-quality-visualizer-website.PNG"),
              require("../../assets/img/air-quality-visualizer/air-quality-visualizer-award.PNG"),
              require("../../assets/img/air-quality-visualizer/air-quality-visualizer-patent.PNG")
            ]}
            title="Air quality visualizer"
            message="삼성에서의 첫 IF DESIGN 수상작이자 첫 특허를 가지고 있는 이 프로젝트는, 디자이너와 개발의 커뮤니케이션을 극대화한 상징적인 프로젝트입니다. Arduino의 거리측정 센서를 통해 디스플레이할 정보의 차별을 둔 새로운 UX을 제공하는 로직을 가지고 있었습니다. Particle shader 랜더링 / Arduino와 거리측정 센서를 통한 정보의 다양화하였습니다. 파티클과 배경색을 이용한 대략적인 정보를 원거리에서 제공하였고, 근거리에서는 좀더 자세한 수치를 제공하는 UI를 제공하였습니다."
          />
          <PortfolioItem
            thumbnailSrc={require("../../assets/img/article/thumbnail.jpg")}
            srcUrls={[
              require("../../assets/img/article/article1.png"),
              require("../../assets/img/article/article2.png"),
              require("../../assets/img/article/article3.png")
            ]}
            title="Articles"
            message="저와 관련된 기사입니다"
          />
          <PortfolioItem
            thumbnailSrc={require("../../assets/img/Shader Test.PNG")}
            srcUrls={[
            ]}
            title="Shader (WIP)"
            message="Shader experiment with three.js / Unity shader / glsl / hlsl and so on"
          />
        </Row>
      </Container>
    </section>
  );
};
