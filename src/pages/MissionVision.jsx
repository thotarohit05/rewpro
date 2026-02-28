import { RiLightbulbFlashLine } from "react-icons/ri";
import { TbTargetArrow } from "react-icons/tb";
import { CiWheat } from "react-icons/ci";
import "./../styles/missionVision.css";

const MissionVision = () => {
    return (
        <section className="mvSection">
            <div className="mvContainer">

                <div className="mvTitleWrapper">
                    <CiWheat className="mvTitleIcon" />
                    <h1 className="mvTitle">Vision & Mission</h1>
                    <CiWheat className="mvTitleIcon" />
                </div>

                {/* Vision */}
                <div className="mvCard">
                    <div className="mvHeader">
                        <RiLightbulbFlashLine className="mvIcon visionIcon" />
                        <h2 className="mvHeading">Our Vision</h2>
                    </div>

                    <p className="mvText">
                        To be a symbol of <strong>trust and reliability</strong> among farmers,
                        building long-term relationships rooted in honesty, commitment, and responsibility.
                        <span className="companyHighlightwithbox">
                            "RAMANA ENGINEERING WORKS"
                        </span> envisions empowering rural communities by supporting their growth
                        with dependable agricultural solutions that enhance productivity,
                        strengthen livelihoods, and contribute to sustainable farming for future generations.
                    </p>
                </div>

                {/* Mission */}
                <div className="mvCard">
                    <div className="mvHeader">
                        <TbTargetArrow className="mvIcon missionIcon" />
                        <h2 className="mvHeading">Our Mission</h2>
                    </div>

                    <p className="mvText">
                        Our mission is to strengthen farmer confidence by standing with them
                        as a reliable partner in every season.
                    </p>

                    <ul className="mvList">
                        <li>Delivering consistent quality farmers can depend on</li>
                        <li>Providing timely and responsible support</li>
                        <li>Organizing <span className="companyHighlightwithbox">free service camps</span> to reduce their burden</li>
                        <li>Building relationships based on honesty and respect</li>
                        <li>Growing together with farming communities year after year</li>
                    </ul>
                </div>

            </div>
        </section>
    );
};

export default MissionVision;