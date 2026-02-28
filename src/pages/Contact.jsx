import "../styles/contact.css";
import { FaPhoneAlt, FaEnvelope, FaLocationArrow, FaClock } from "react-icons/fa";
import { RiShieldFlashFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Contact = () => {

    const navigate = useNavigate();

    return (
        <div className="page contact">
            <div className="contactContainer">

                {/* Breadcrumb */}
                <div className="breadcrumb">
                    <span
                        className="breadcrumbLink"
                        onClick={() => navigate("/")}
                    >
                        Home
                    </span>
                    <span className="separator"> &gt; </span>
                    <span className="active">Contact Us</span>
                </div>

                <div className="contactBox">

                    {/* Left Side - Info */}
                    <div className="contactLeft">
                        <h1 >Contact Us</h1>
                        <h5 className="companyName">
                            RAMANA ENGINEERING WORKS
                        </h5>

                        <div className="infoItem">
                            <FaPhoneAlt className="infoIcon" />
                            <a href="tel:+919866089143">+91 98660 89143</a>
                            <a href="tel:+919866369143">+91 98663 69143</a>
                        </div>

                        <div className="infoItem">
                            <FaEnvelope className="infoIcon" />
                            <a href="mailto:ramanaengineeringworks2@gmail.com">ramanaengineeringworks2@gmail.com</a>
                        </div>

                        <div className="infoItem">
                            <FaLocationArrow className="infoIcon" />
                            <span>D.No: 8-213/9, Bhupalpally Road Parkal (Village),<br />
                                Parkal, Dist: Hanumakonda, <br />
                                Pincode-506164, <br />
                                State: Telangana-INDIA</span>
                        </div>

                        <div className="infoItem">
                            <FaClock className="infoIcon" />
                            <span>Mon - Sat, 9:00 AM - 8:00 PM</span>
                        </div>
                        <div className="infoItem">
                            <RiShieldFlashFill className="infoIcon" />
                            <span>GSTNO: 36AJWPT7495B1ZD</span>
                        </div>

                    </div>

                    {/* Right Side - Map */}
                    <div className="contactRight">
                        <iframe
                            title="Ramana Engineering Works Map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3797.468899478465!2d79.70427731527168!3d18.196455051305595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a333fa86bbae363%3A0xdd41d074a5423c8d!2sRamana%20Engineering%20Works!5e0!3m2!1sen!2sin!4v1708915200000!5m2!1sen!2sin"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                        />
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Contact;