export const Header = () => {
  return (
    <header className="masthead bg-primary text-white text-center">
      <div className="container d-flex align-items-center flex-column">
        <img
          className="masthead-avatar mb-5"
          src={require("../assets/img/Profile Picture.jpg")}
          alt="..."
        />
        <iframe
          title="https://dhygns.github.io/interactive-traditional-art-paint/"
          className="masthead-background"
          src="https://dhygns.github.io/interactive-traditional-art-paint/"
        />
        <p className="masthead-subheading font-weight-light mb-0">
          AR/VR Engineer - Full Stack - Creative Coder
        </p>
      </div>
    </header>
  );
};
