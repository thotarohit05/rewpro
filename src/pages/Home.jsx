import "../styles/home.css";
import { useNavigate } from "react-router-dom";
import About from "./About";
import Product from "./Product";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">

      {/* HERO SECTION */}
      <section className="heroSection">
        <div className="heroContent">
          <h1>
            Empowering Farmers with <span>Trusted Agricultural Solutions</span>
          </h1>
          <p>
            RAMANA ENGINEERING WORKS delivers high quality implements,
            reliable service, and long-term farmer partnerships.
          </p>

          <div className="heroButtons">
            <button onClick={() => navigate("/our-brands")}>
              Explore Our Brands
            </button>
            <button
              className="outlineBtn"
              onClick={() => navigate("/book-service")}>
              Book Service
            </button>
          </div>
        </div>
      </section>
<Product/>
      {/* ABOUT PREVIEW */}
      <About />
    </div>
  );
};

export default Home;