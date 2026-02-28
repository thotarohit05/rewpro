import "../styles/ourBrands.css";

import shaktiman from "../assets/brands/shaktiman.png";
import ashwashakti from "../assets/brands/Ashwashakti.avif";
import gobind from "../assets/brands/gobind.png";
import fieldroxx from "../assets/brands/fieldroxx.jpeg";
import sonalika from "../assets/brands/sonalika-agro.png";
import REW from "../assets/brands/logo.png";
import fieldmaxx from "../assets/brands/fieldmaxx.webp";
const brands = [
    {
        name: "Shaktiman",
        logo: shaktiman,
        url: "https://shaktimanagro.com/products",
    },
    {
        name: "Ramana Engineering Works",
        logo: REW,
        url: "/product",
    },
    {
        name: "Ashwashakti",
        logo: ashwashakti,
        url: "https://www.ashwashaktiagro.com/products-range",
    },
    {
        name: "Gobind",
        logo: gobind,
        url: "https://gobindalloys.com/",
    },
    // {
    //     name: "Fieldroxx",
    //     logo: fieldroxx,
    //     url: null,
    // },
    {
        name: "Sonalika",
        logo: sonalika,
        url: "https://www.sonalikaimplements.com/land-preparation",
    },
    {
        name: "Fieldmaxx",
        logo: fieldmaxx,
        url: "https://fieldmax.info/shop/",
    },
];

const OurBrands = ({ isStandalone = true }) => {
    return (
        <div className={isStandalone ? "brandsPage" : undefined}>
            <div className="brandsContainer">
                <h1>Our Brands</h1>

                <p className="brandDescription">
                    We are authorized dealers and distributors of leading Agricultural
                    Implements brands. Click below to view their product range.
                </p>

                <div className="brandGrid">
                    {brands.map((brand, index) => (
                        <div key={index} className="brandCard">
                            <img src={brand.logo} alt={brand.name} />
                            {brand.url && (
                                <a
                                    href={brand.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="viewBtn"
                                >
                                    View Products →
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OurBrands;