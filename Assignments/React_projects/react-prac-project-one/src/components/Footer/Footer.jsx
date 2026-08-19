import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <h2>ShopZone </h2>

          <p>Your favorite online shopping destination.</p>
        </div>

        <div>
          <h3>Follow Us</h3>

          <div className="social">
            <FaFacebook />
            <FaInstagram />
            <FaTwitter />
          </div>
        </div>
      </div>

      <div className="copyright">© 2026 ShopZone. All Rights Reserved.</div>
    </footer>
  );
};

export default Footer;
