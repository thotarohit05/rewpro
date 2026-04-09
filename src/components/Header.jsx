import { useState, useEffect } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { LiaToolsSolid } from "react-icons/lia";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/header.css";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="logo" onClick={() => handleNavigate("/")}>
            <img src={logo} alt="Rew-Pro2" />
          </div>

          {/* Hamburger */}
          <div className="menuToggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
          </div>

          <nav className={`navMenu ${menuOpen ? "active" : ""}`}>

            {/* Product */}
            {/* <div
              className={`navItem dropdown ${activeDropdown === "product" ? "open" : ""
                }`}
              onClick={() => toggleDropdown("product")}
            >
              <span>Product</span>
              <IoIosArrowDropdown className="arrowIcon" />
            </div> */}
<div
  className="navItem"
  onClick={() => handleNavigate("/product")}
>
  <span>Product</span>
</div>
            {/* Partner Area */}
            <div className="dropdownWrapper">
              <div
                className={`navItem dropdown ${activeDropdown === "partner" ? "open" : ""
                  }`}
                onClick={() => toggleDropdown("partner")}
              >
                <span>Partner Area</span>
                <IoIosArrowDropdown className="arrowIcon" />
              </div>

              <div
                className={`dropdownMenu mobileDropdown ${activeDropdown === "partner" ? "show" : ""
                  }`}>
                <div
                  className="dropdownItem"
                  onClick={() => handleNavigate("/become-dealer")}>
                  Become a Dealer
                </div>

                <div
                  className="dropdownItem"
                  onClick={() => handleNavigate("/become-distributor")}>
                  Become a Distributor
                </div>
                <div className="dropdownItem" onClick={() => window.open("/REW_Brochure.pdf", "_blank")}>
                  Download Brochure
                </div>
              </div>
            </div>

            {/* Company */}
            <div className="dropdownWrapper">
              <div
                className={`navItem ${activeDropdown === "company" ? "open" : ""
                  }`}
                onClick={() => toggleDropdown("company")}>
                <span>Company</span>
                <IoIosArrowDropdown className="arrowIcon" />
              </div>

              <div
                className={`dropdownMenu mobileDropdown ${activeDropdown === "company" ? "show" : ""
                  }`}>
                <div
  className="dropdownItem" onClick={() => handleNavigate("/our-brands")}>Our Brands</div>
                <div className="dropdownItem" onClick={() => handleNavigate("/about")}>About Us</div>
                <div className="dropdownItem" onClick={() => handleNavigate("/infrastructure")}>Infrastructure</div>
                <div className="dropdownItem" onClick={() => handleNavigate("/mission-vision")}>
                  Mission & Vision</div>
                <div
                  className="dropdownItem"
                  onClick={() => handleNavigate("/book-service")}
                >
                  Book Tractor Service
                </div>
              </div>
            </div>

            <div
              className="navItem"
              onClick={() => handleNavigate("/contact-us")}>
              <span>Contact Us</span>
            </div>

            {/* Mobile Button */}
            <button
              className="serviceBtn mobileBtn"
              onClick={() => handleNavigate("/book-service")}>
              <LiaToolsSolid className="btnIcon" />
              Book Tractor Service
            </button>
          </nav>

          {/* Desktop Button */}
          <button
            className="serviceBtn desktopBtn"
            onClick={() => handleNavigate("/book-service")}>
            <LiaToolsSolid className="btnIcon" />
            Book Tractor Service
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="overlay" onClick={() => setMenuOpen(false)} />
      )}
    </>
  );
};

export default Header;