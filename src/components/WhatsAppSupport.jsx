import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";

export default function WhatsAppSupport() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      style={styles.wrapper}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {showTooltip && <div style={styles.tooltip}>Chat with us</div>}

      <a
        href="https://wa.me/919182425192?text=Hello%20I%20need%20support"
        target="_blank"
        rel="noopener noreferrer"
        style={styles.whatsapp}
      >
        <FaWhatsapp size={28} color="#fff" />
      </a>
    </div>
  );
}

const styles = {
  wrapper: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    display: "flex",
    alignItems: "center",
    zIndex: 1000,
  },
  whatsapp: {
    backgroundColor: "#25D366",
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    cursor: "pointer",
    textDecoration: "none",
  },
  tooltip: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "6px 10px",
    borderRadius: "6px",
    marginRight: "10px",
    fontSize: "13px",
    whiteSpace: "nowrap",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  },
};