import { useTranslation } from "react-i18next";

function InfoSection() {

  const { t } = useTranslation();

  return (

    <section className="info-section">

      <h2>
        {t("infoSection.orderFoodTitle")}
      </h2>

      <p>
        {t("info.orderFoodDescription")}
      </p>


      <h2>
        {t("info.foodDeliveryTitle")}
      </h2>

      <p>
        {t("info.foodDeliveryDescription")}
      </p>


      <h2>
        {t("info.discoverTitle")}
      </h2>

      <p>
        {t("info.discoverDescription")}
      </p>

    </section>

  );
}

export default InfoSection;