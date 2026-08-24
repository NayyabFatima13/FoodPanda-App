import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import DOMPurify from "dompurify";
import { useTranslation } from "react-i18next";

function Checkout({ cart, total, onPlaceOrder }) {

  const [showSuccess, setShowSuccess] =
    useState(false);

  const { t } = useTranslation();


  // ==========================================
  // FORM VALIDATION
  // ==========================================

  const formik = useFormik({

    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      paymentMethod: "Cash on Delivery"
    },


    validationSchema: Yup.object({

      fullName: Yup.string()
        .min(
          3,
          t("checkout.validation.nameMin")
        )
        .required(
          t("checkout.validation.nameRequired")
        ),

      email: Yup.string()
        .email(
          t("checkout.validation.emailInvalid")
        )
        .required(
          t("checkout.validation.emailRequired")
        ),

      phone: Yup.string()
        .matches(
          /^[0-9]{10,15}$/,
          t("checkout.validation.phoneInvalid")
        )
        .required(
          t("checkout.validation.phoneRequired")
        ),

      address: Yup.string()
        .min(
          10,
          t("checkout.validation.addressMin")
        )
        .required(
          t("checkout.validation.addressRequired")
        ),

      city: Yup.string()
        .required(
          t("checkout.validation.cityRequired")
        ),

      paymentMethod: Yup.string()
        .required(
          t("checkout.validation.paymentRequired")
        )

    }),


    // ==========================================
    // SUBMIT
    // ==========================================

    onSubmit: (values) => {

      // ==========================================
      // SANITIZE DATA BEFORE CREATING ORDER
      // ==========================================

      const sanitizedCustomer = {

        fullName: DOMPurify.sanitize(
          values.fullName,
          {
            ALLOWED_TAGS: [],
            ALLOWED_ATTR: []
          }
        ),

        email: DOMPurify.sanitize(
          values.email,
          {
            ALLOWED_TAGS: [],
            ALLOWED_ATTR: []
          }
        ),

        phone: DOMPurify.sanitize(
          values.phone,
          {
            ALLOWED_TAGS: [],
            ALLOWED_ATTR: []
          }
        ),

        address: DOMPurify.sanitize(
          values.address,
          {
            ALLOWED_TAGS: [],
            ALLOWED_ATTR: []
          }
        ),

        city: DOMPurify.sanitize(
          values.city,
          {
            ALLOWED_TAGS: [],
            ALLOWED_ATTR: []
          }
        ),

        paymentMethod:
          values.paymentMethod

      };


      // ==========================================
      // CREATE ORDER
      // ==========================================

      const order = {

        customer: sanitizedCustomer,

        items: cart,

        total: total

      };


      console.log(
        "ORDER:",
        order
      );


      // ==========================================
      // CALL PARENT FUNCTION
      // ==========================================

      if (onPlaceOrder) {

        onPlaceOrder(order);

      }


      // ==========================================
      // SHOW SUCCESS POPUP
      // ==========================================

      setShowSuccess(true);


      // ==========================================
      // HIDE POPUP AFTER 3 SECONDS
      // ==========================================

      setTimeout(() => {

        setShowSuccess(false);

      }, 3000);


      // ==========================================
      // RESET FORM
      // ==========================================

      formik.resetForm();

    }

  });


  // ==========================================
  // SANITIZED INPUT HANDLER
  // ==========================================

  const handleSanitizedChange = (e) => {

    const {
      name,
      value
    } = e.target;


    const sanitizedValue =
      DOMPurify.sanitize(
        value,
        {
          ALLOWED_TAGS: [],
          ALLOWED_ATTR: []
        }
      );


    formik.setFieldValue(
      name,
      sanitizedValue
    );

  };


  return (

    <div className="checkout-container">


      {/* ==========================================
          SUCCESS POPUP
          ========================================== */}

      {showSuccess && (

        <div className="order-success-popup">

          <div className="success-icon">
            ✓
          </div>


          <div>

            <strong>
              {t("checkout.successTitle")}
            </strong>

            <p>
              {t("checkout.successMessage")}
            </p>

          </div>

        </div>

      )}


      {/* ==========================================
          CHECKOUT TITLE
          ========================================== */}

      <h2>
        {t("checkout.title")}
      </h2>


      <form
        onSubmit={
          formik.handleSubmit
        }
      >


        {/* ==========================================
            FULL NAME
            ========================================== */}

        <div className="form-group">

          <label>
            {t("checkout.fullName")}
          </label>


          <input
            type="text"
            name="fullName"
            placeholder={
              t("checkout.placeholders.fullName")
            }
            value={
              formik.values.fullName
            }
            onChange={
              handleSanitizedChange
            }
            onBlur={
              formik.handleBlur
            }
          />


          {formik.touched.fullName &&
            formik.errors.fullName && (

              <p className="error">

                {
                  formik.errors.fullName
                }

              </p>

            )}

        </div>


        {/* ==========================================
            EMAIL
            ========================================== */}

        <div className="form-group">

          <label>
            {t("checkout.email")}
          </label>


          <input
            type="email"
            name="email"
            placeholder={
              t("checkout.placeholders.email")
            }
            value={
              formik.values.email
            }
            onChange={
              handleSanitizedChange
            }
            onBlur={
              formik.handleBlur
            }
          />


          {formik.touched.email &&
            formik.errors.email && (

              <p className="error">

                {
                  formik.errors.email
                }

              </p>

            )}

        </div>


        {/* ==========================================
            PHONE NUMBER
            ========================================== */}

        <div className="form-group">

          <label>
            {t("checkout.phone")}
          </label>


          <input
            type="tel"
            name="phone"
            placeholder={
              t("checkout.placeholders.phone")
            }
            value={
              formik.values.phone
            }
            onChange={
              handleSanitizedChange
            }
            onBlur={
              formik.handleBlur
            }
          />


          {formik.touched.phone &&
            formik.errors.phone && (

              <p className="error">

                {
                  formik.errors.phone
                }

              </p>

            )}

        </div>


        {/* ==========================================
            DELIVERY ADDRESS
            ========================================== */}

        <div className="form-group">

          <label>
            {t("checkout.address")}
          </label>


          <textarea
            name="address"
            placeholder={
              t(
                "checkout.placeholders.address"
              )
            }
            value={
              formik.values.address
            }
            onChange={
              handleSanitizedChange
            }
            onBlur={
              formik.handleBlur
            }
          />


          {formik.touched.address &&
            formik.errors.address && (

              <p className="error">

                {
                  formik.errors.address
                }

              </p>

            )}

        </div>


        {/* ==========================================
            CITY
            ========================================== */}

        <div className="form-group">

          <label>
            {t("checkout.city")}
          </label>


          <input
            type="text"
            name="city"
            placeholder={
              t("checkout.placeholders.city")
            }
            value={
              formik.values.city
            }
            onChange={
              handleSanitizedChange
            }
            onBlur={
              formik.handleBlur
            }
          />


          {formik.touched.city &&
            formik.errors.city && (

              <p className="error">

                {
                  formik.errors.city
                }

              </p>

            )}

        </div>


        {/* ==========================================
            PAYMENT METHOD
            ========================================== */}

        <div className="form-group">

          <label>
            {t("checkout.paymentMethod")}
          </label>


          <select
            name="paymentMethod"
            value={
              formik.values.paymentMethod
            }
            onChange={
              formik.handleChange
            }
          >

            <option value="Cash on Delivery">
              {t("checkout.cashOnDelivery")}
            </option>


            <option value="Card">
              {t("checkout.cardPayment")}
            </option>

          </select>

        </div>


        {/* ==========================================
            ORDER SUMMARY
            ========================================== */}

        <div className="checkout-summary">

          <h3>
            {t("checkout.orderSummary")}
          </h3>


          <p>
            {t("checkout.items")}:{" "}
            {cart.length}
          </p>


          <p>
            {t("checkout.total")}: Rs.{" "}
            {total}
          </p>

        </div>


        {/* ==========================================
            PLACE ORDER BUTTON
            ========================================== */}

        <button
          type="submit"
          className="place-order-btn"
        >
          {t("checkout.placeOrder")}
        </button>


      </form>

    </div>

  );

}

export default Checkout;