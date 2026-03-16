import { FaYoutube, FaInstagram, FaFacebookF } from "react-icons/fa6";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FiSettings } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Footer.css";

export default function Footer() {

  const navigate = useNavigate();
  const year = new Date().getFullYear();
  const [showDev, setShowDev] = useState(false);

  const handleAdminAccess = () => {
    sessionStorage.setItem("allowAdminAccess", "true");
    navigate("/admin-login");
  };

  return (
    <footer className="footer">

      <div className="container footer-grid">

        <div className="footer-logo">
          <img src={logo} alt="Ramana Engineering Works" />
        </div>

        <div className="footer-col">
          <h4>Partner Area</h4>
          <span onClick={() => navigate("/become-dealer")}>Become Dealer</span>
          <span onClick={() => navigate("/become-distributor")}>Become Distributor</span>
        </div>

        <div className="footer-col">
          <h4>Support</h4>
          <span onClick={() => navigate("/contact-us")}>Contact Us</span>
          <span>Sitemap</span>
        </div>

        <div className="footer-social">
          <p>Follow us on</p>
          <div className="social-icons">

            <FaYoutube onClick={() => window.open("https://www.youtube.com/", "_blank")} />

            <FaInstagram onClick={() =>
              window.open("https://www.instagram.com/ramanaengineeringworks_parkal?igsh=Nnk1MDBremZtc2x4", "_blank")
            } />

            <FaFacebookF onClick={() =>
              window.open("https://www.facebook.com/share/1CchLBbGyN/", "_blank")
            } />

          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-row">

          <div>
            <span
              className="dev-toggle"
              onClick={() => setShowDev(!showDev)}
            >
              <IoMdInformationCircleOutline className="dev-icon" />
              Developer Info
            </span>

            {showDev && (
              <div className="dev-info">
                Developed by <b>Mr.Rohit</b><br />
                Email: thota.rohit0505@gmail.com<br />
                Phone: +91 91824 25192
              </div>
            )}
          </div>

          <span className="copyright">
            <FiSettings
              size={18}
              className="admin-settings-icon"
              onClick={handleAdminAccess}
            />
            © {year} RAMANA ENGINEERING WORKS. All Rights Reserved.
          </span>

        </div>
      </div>

    </footer>
  );
}