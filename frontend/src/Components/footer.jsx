import foodpandaLogo from "../assets/foodpanda-logo-horizontal.png";
import { useTranslation } from "react-i18next";

function Footer() {

  const { t } = useTranslation();

  return (

    <footer className="footer">

      <div className="footer-top">


        {/* ==========================================
            BRAND
            ========================================== */}

        <div className="footer-brand">

          <div className="footer-logo">

            <img
              src={foodpandaLogo}
              alt="foodpanda"
            />

          </div>

          <p>
            {t("footer.description")}
          </p>

        </div>


        {/* ==========================================
            COMPANY
            ========================================== */}

        <div className="footer-column">

          <h4>
            {t("footer.company.title")}
          </h4>

          <a href="#">
            {t("footer.company.about")}
          </a>

          <a href="#">
            {t("footer.company.careers")}
          </a>

          <a href="#">
            {t("footer.company.terms")}
          </a>

          <a href="#">
            {t("footer.company.privacy")}
          </a>

        </div>


        {/* ==========================================
            FOR CUSTOMERS
            ========================================== */}

        <div className="footer-column">

          <h4>
            {t("footer.customers.title")}
          </h4>

          <a href="#">
            {t("footer.customers.help")}
          </a>

          <a href="#">
            {t("footer.customers.contact")}
          </a>

          <a href="#">
            {t("footer.customers.refunds")}
          </a>

          <a href="#">
            {t("footer.customers.tracking")}
          </a>

        </div>


        {/* ==========================================
            FOR PARTNERS
            ========================================== */}

        <div className="footer-column">

          <h4>
            {t("footer.partners.title")}
          </h4>

          <a href="#">
            {t("footer.partners.restaurant")}
          </a>

          <a href="#">
            {t("footer.partners.rider")}
          </a>

          <a href="#">
            {t("footer.partners.business")}
          </a>

        </div>


        {/* ==========================================
            SOCIAL
            ========================================== */}

        <div className="footer-column">

          <h4>
            {t("footer.social.title")}
          </h4>

          <div className="social-icons">

            <button>
              f
            </button>

            <button>
              𝕏
            </button>

            <button>
              ◎
            </button>

            <button>
              in
            </button>

          </div>

        </div>

      </div>


      <div className="footer-divider"></div>


      {/* ==========================================
          FOOTER BOTTOM
          ========================================== */}

      <div className="footer-bottom">

        <div>
          © 2026 foodpanda
        </div>

        <div className="footer-bottom-links">

          <span>
            {t("footer.bottom.privacy")}
          </span>

          <span>
            {t("footer.bottom.terms")}
          </span>

          <span>
            {t("footer.bottom.cookies")}
          </span>

        </div>

      </div>

    </footer>
  );
}

export default Footer;