function PromoSection() {

  const promotions = [
    {
      title: "Up to",
      discount: "30% off",
      text: "Azaadi deals",
      emoji: "🍕"
    },
    {
      title: "Deal for",
      discount: "Rs. 299",
      text: "Rs. 269",
      emoji: "🍨"
    }
  ];

  return (
    <section className="promo-section">

      {promotions.map((promo, index) => (

        <div className="promo-card" key={index}>

          <div className="promo-text">

            <h3>{promo.title}</h3>

            <h2>{promo.discount}</h2>

            <span>{promo.text}</span>

          </div>

          <div className="promo-image">
            {promo.emoji}
          </div>

        </div>

      ))}

    </section>
  );
}

export default PromoSection;