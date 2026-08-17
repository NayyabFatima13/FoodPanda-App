import foodpandaLogo from "../assets/foodpanda-logo-horizontal.png";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-top">

        {/* Brand */}
        <div className="footer-brand">

          <div className="footer-logo">
            <img
              src={foodpandaLogo}
              alt="foodpanda"
            />
          </div>

          <p>
            Order food online from your favorite
            restaurants and enjoy fast delivery.
          </p>

        </div>


        {/* Company */}
        <div className="footer-column">

          <h4>Company</h4>

          <a href="#">About us</a>
          <a href="#">Careers</a>
          <a href="#">Terms and conditions</a>
          <a href="#">Privacy policy</a>

        </div>


        {/* For customers */}
        <div className="footer-column">

          <h4>For customers</h4>

          <a href="#">Help Center</a>
          <a href="#">Contact us</a>
          <a href="#">Refunds</a>
          <a href="#">Order tracking</a>

        </div>


        {/* For partners */}
        <div className="footer-column">

          <h4>For partners</h4>

          <a href="#">List your restaurant</a>
          <a href="#">Become a rider</a>
          <a href="#">Business solutions</a>

        </div>


        {/* Social */}
        <div className="footer-column">

          <h4>Follow us</h4>

          <div className="social-icons">

            <button>f</button>
            <button>𝕏</button>
            <button>◎</button>
            <button>in</button>

          </div>

        </div>

      </div>


      <div className="footer-divider"></div>


      <div className="footer-bottom">

        <div>
          © 2026 foodpanda
        </div>

        <div className="footer-bottom-links">

          <span>Privacy</span>
          <span>Terms</span>
          <span>Cookies</span>

        </div>

      </div>

    </footer>
  );
}

export default Footer;