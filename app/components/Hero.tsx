import './styles/hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg"></div>
      <div className="hero-content">
        <div className="hero-tag">Luxury Collection 2025</div>
        <h1>The Art of<br/><em>Celebration</em><br/>Ignited</h1>
        <p className="hero-sub">Handcrafted premium crackers for the discerning connoisseur. Where every spark tells a story of excellence and tradition.</p>
        <div className="hero-btns">
          <button className="btn-primary" onClick={() => {
            document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
          }}>Explore Collection</button>
          <button className="btn-secondary">Our Story</button>
        </div>
      </div>
      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}
