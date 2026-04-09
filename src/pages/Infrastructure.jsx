import { useState, useEffect } from "react";
import "../styles/Infrastructure.css";

import img1 from "../assets/company/company.webp";
import img2 from "../assets/company/company1.webp";
import img3 from "../assets/company/company2.webp";
import img4 from "../assets/company/company3.webp";
import img5 from "../assets/company/company4.jpg";
import img6 from "../assets/company/company5.jpg";
import img7 from "../assets/company/company6.jpg";

const images = [img1, img2, img3, img4, img5, img6, img7];

const Infrastructure = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="infra-page">
      <h2 className="infra-title">Gallery</h2>

      <div className="infra-slider">
        {images.map((img, index) => (
          <div
            key={index}
            className={`infra-slide ${index === current ? "active" : ""}`}
          >
            <img src={img} alt={`Slide ${index}`} />
          </div>
        ))}

        {/* Dots */}
        <div className="infra-dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === current ? "active" : ""}`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Infrastructure;