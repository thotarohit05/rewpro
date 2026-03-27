import "../styles/product.css";

import trolley from "../assets/product/trolley.png";
import cagewheel from "../assets/product/cagewheels.png";
import cultivator from "../assets/product/cultivator.png";
import rotavator from "../assets/product/rotavator.png";
import plough from "../assets/product/MB-Plough.png";
import baler from "../assets/product/baler.png";
import OurBrands from "./OurBrands";

const Product = () => {
  const manufacturedProducts = [
    { name: "Tractor Trolley", image: trolley },
    { name: "Cage Wheels", image: cagewheel },
    { name: "Cultivator", image: cultivator },
  ];

  const dealerProducts = [
    { name: "Rotary Tiller", image: rotavator },
    { name: "Reverse MB Plough", image: plough },
    { name: "Baler", image: baler },
  ];

  return (
    <div className="productPage">

      {/* MANUFACTURED PRODUCTS */}
      <section className="productSection">
        <div className="sectionHeader">
          <h2>Our Manufactured Products</h2>
          <p>Designed & Built by <span className="companyHighlightwithbox">
            "RAMANA ENGINEERING WORKS"
          </span></p>
        </div>

        <div className="productGrid">
          {manufacturedProducts.map((item, index) => (
            <div key={index} className="productCard">
              <div className="imageWrapper">
                <img src={item.image} alt={item.name} />
              </div>
              <h3>{item.name}</h3>
              <span className="badge">Manufactured by Us</span>
            </div>
          ))}
        </div>
      </section>

      {/* DEALER PRODUCTS */}
      <section className="productSection">
        <div className="sectionHeader dealerHeader">
          <h2>Authorized Dealer Products</h2>
          <p>Trusted Implements from Leading Brands</p>
        </div>

        <div className="productGrid">
          {dealerProducts.map((item, index) => (
            <div key={index} className="productCard">
              <div className="imageWrapper">
                <img src={item.image} alt={item.name} />
              </div>
              <h3>{item.name}</h3>
              <span className="dealerBadge">Authorized Dealer</span>
            </div>
          ))}
        </div>
      </section>
      <OurBrands isStandalone={false} />
    </div>
  );
};

export default Product;