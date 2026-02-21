import React from "react";
import {
  FaTachometerAlt,
  FaChartLine,
  FaBell,
  FaUser,
  FaEnvelope,
  FaCamera,
  FaChartBar,
  FaFileAlt,
  FaDownload,
  FaTools,
  FaLock,
  FaSlidersH
} from "react-icons/fa";

const Card = ({ heading, page}) => {
  const cardFor = (page) => {
    switch (page) {
      case "Home":
        return (
          <div className="card-icon-group">
            <FaTachometerAlt className="card-icon" />
            <FaChartLine className="card-icon" />
            <FaBell className="card-icon" />
          </div>
        );
      case "Profile":
        return (
          <div className="card-icon-group">
            <FaUser className="card-icon" />
            <FaEnvelope className="card-icon" />
            <FaCamera className="card-icon" />
          </div>
        );
      case "Reports":
        return (
          <div className="card-icon-group">
            <FaChartBar className="card-icon" />
            <FaFileAlt className="card-icon" />
            <FaDownload className="card-icon" />
          </div>
        );
      case "Settings":
        return (
          <div className="card-icon-group">
            <FaTools className="card-icon" />
            <FaLock className="card-icon" />
            <FaSlidersH className="card-icon" />
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div className="home-container">
      <div className="card">
        <h2 className="card-heading">{heading}</h2>
        {cardFor(page)}
      </div>
    </div>
  );
};

export default Card;
