import "./../styles/about.css";

const About = () => {
    return (
        <section className="about">
            <div className="aboutWrapper">

                {/* LEFT CONTENT */}
                <div className="aboutContent">

                    <div className="aboutLine"></div>

                    <h2 className="aboutTitle">
                        About Us
                    </h2>

                    <p className="aboutText">
                        <span className="companyHighlight">
                            "RAMANA ENGINEERING WORKS"
                        </span> has been serving the agricultural industry with
                        <span className="companyHighlightwithbox">
                            over 30 years of trust and excellence. </span>
                        We are a trusted dealer and distributor of
                        <strong> Rotavators, Reverse MB-Plough and Balers</strong>,
                        delivering reliable and high-performance agricultural machinery to farmers.
                    </p>

                    <p className="aboutText">
                        We are also manufacturers of quality agricultural implements including
                        <strong> Tractor Trolleys, Cultivators, Ploughs, Cage Wheels </strong>
                        and other essential farming equipment built for durability and strength.
                        We also maintain a complete range of<br />
                        <span className="companyHighlightwithbox"> high-quality genuine spare parts</span>,
                        ensuring consistent performance, reduced downtime, and long-term reliability.
                    </p>
                    <p className="aboutText">
                        Our services cover
                        <strong> all types of Tractors and Rotavators</strong>.
                        We provide professional maintenance, repair support, and dependable after-sales service to ensure long-lasting performance.
                    </p>

                    <p className="aboutText">
                        To support farmers better, we regularly conduct
                        <strong> free service camps</strong>, ensuring machinery stays in top working condition while building long-term relationships based on trust and reliability.
                    </p>

                </div>

                {/* RIGHT IMAGE */}
                <div className="aboutImage">
                    <img src="/about.jpg" alt="about REW" />
                </div>

            </div>
        </section>
    );
};

export default About;