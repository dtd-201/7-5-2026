import "../styles/Footer.css";
import { useState } from "react";

function Footer({ isDarkMode }) {
  const [email, setEmail] = useState("");

  return (
    <footer className={`footer ${isDarkMode ? "dark" : ""}`}>
      <div className="footer-container">
        <div className="footer-left">
          <div className="logo">
            <img src="/coingecko-api-favicon.svg" alt="logo" />
            <span>CoinGecko</span>
          </div>

          <p>
            CoinGecko provides a fundamental analysis of the crypto market. In
            addition to tracking price, volume and market capitalisation,
            CoinGecko tracks community growth, open-source code development,
            major events and on-chain metrics.
          </p>
        </div>

        <div className="footer-columns">
          <div>
            <h4>Resources</h4>
            <a href="#">Crypto News</a>
            <a href="#">Crypto API</a>
            <a href="#">Crypto Widgets</a>
            <a href="#">Crypto Glossary</a>
          </div>

          <div>
            <h4>Support</h4>
            <a href="#">Help Center</a>
            <a href="#">FAQ</a>
            <a href="#">Contact Us</a>
          </div>

          <div>
            <h4>About</h4>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
          </div>

          <div>
            <h4>Community</h4>
            <a href="#">facebook</a>
            <a href="#">Discord</a>
            <a href="#">github</a>
            <a href="#">Intagram</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div>
          <h4>Stay up-to-date with crypto</h4>
          <p>Subscribe for latest crypto news & updates</p>
        </div>

        <div className="subscribe">
          <input
            placeholder="Enter email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button>Subscribe</button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
