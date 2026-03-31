import './styles/testimonials.css';

export default function Testimonials() {
  const testimonials = [
    {
      text: "The Golden Cascade set was breathtaking. Every piece ignited perfectly — our Diwali celebration was truly elevated to something extraordinary.",
      author: "Priya Mehta, Mumbai",
      rating: 5
    },
    {
      text: "Pyrocraft's packaging alone is a gift. The crackers themselves are the finest I've encountered — vibrant, long-lasting, and absolutely safe for children.",
      author: "Arjun Sharma, Delhi",
      rating: 5
    },
    {
      text: "Ordered the Prestige Gift Box for a corporate event. Everyone was stunned. Delivery was impeccable and customer service was outstanding.",
      author: "Kavitha Nair, Bangalore",
      rating: 5
    }
  ];

  return (
    <section className="testimonials" id="reviews">
      <div className="section-header">
        <span className="section-tag">What Clients Say</span>
        <h2 className="section-title">Voices of <em>Delight</em></h2>
        <div className="divider"></div>
      </div>
      <div className="testimonials-grid">
        {testimonials.map((testi, idx) => (
          <div key={idx} className="testimonial">
            <div className="stars">{'★'.repeat(testi.rating)}</div>
            <p className="testimonial-text">{testi.text}</p>
            <div className="testimonial-author">— {testi.author}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
