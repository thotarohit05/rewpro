import { FaWhatsapp } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();
  const navigate = useNavigate();

  const handleAdminAccess = () => {
    sessionStorage.setItem("allowAdminAccess", "true");
    navigate("/admin-login");
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          © {year} <strong>RAMANA ENGINEERING WORKS</strong>. All rights reserved.
        </div>

        <div className="footer-right">
          <FiSettings
            size={18}
            className="admin-settings-icon"
            onClick={handleAdminAccess}
          />
          <span>
            Designed & Developed by <strong>Mr. Rohit</strong>
          </span>
          <a
            href="https://wa.me/919182425192?text=Hello%20I%20need%20development%20support"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <FaWhatsapp size={18} />
            DM for developments
          </a>
        </div>
      </div>
    </footer>
  );
}