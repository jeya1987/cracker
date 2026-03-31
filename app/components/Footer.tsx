import './styles/footer.css';

export default function Footer() {
  return (
    <footer id="contact">
      <div className="footer-grid">
        <div>
          <div className="footer-brand">PYROCRAFT</div>
          <p className="footer-tagline">Crafting luminous moments since 1998. Every cracker is a testament to our devotion to quality and celebration.</p>
        </div>
        <div>
          <div className="footer-heading">Collection</div>
          <ul className="footer-links">
            <li><a href="#">Aerial Series</a></li>
            <li><a href="#">Ground Series</a></li>
            <li><a href="#">Sparklers</a></li>
            <li><a href="#">Gift Boxes</a></li>
          </ul>
        </div>
        <div>
          <div className="footer-heading">Support</div>
          <ul className="footer-links">
            <li><a href="#">Track Order</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">Safety Guide</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <div className="footer-heading">Contact</div>
          <ul className="footer-links">
            <li><a href="mailto:hello@pyrocraft.in">hello@pyrocraft.in</a></li>
            <li><a href="tel:+919876543210">+91 98765 43210</a></li>
            <li><a href="#">Sivakasi, Tamil Nadu</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-copy">© 2025 Pyrocraft. All rights reserved.</span>
        <div className="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Safety</a>
        </div>
      </div>
    </footer>
  );
}
