import { useTranslation } from "react-i18next";

function PromoSection() {

  const { t } = useTranslation();

  const promotions = [
    {
      title: "upTo",
      discount: "30% off",
      text: "azaadiDeals",
      emoji: "🍕"
    },
    {
      title: "dealFor",
      discount: "Rs. 299",
      text: "rs269",
      emoji: "🍨"
    }
  ];

  return (

    <section className="promo-section">

      {promotions.map((promo, index) => (

        <div
          className="promo-card"
          key={index}
        >

          <div className="promo-text">

            <h3>
              {t(
                `promo.items.${promo.title}`
              )}
            </h3>

            <h2>
              {promo.discount}
            </h2>

            <span>
              {t(
                `promo.items.${promo.text}`
              )}
            </span>

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