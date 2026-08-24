import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import DOMPurify from "dompurify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  createRestaurant,
  updateRestaurant,
} from "../redux/slices/restaurantSlice";


function RestaurantForm() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { id } = useParams();

  const isEditMode = Boolean(id);


  // ==========================================
  // TRANSLATION
  // ==========================================

  const { t } = useTranslation();


  // ==========================================
  // REDUX STATE
  // ==========================================

  const restaurants = useSelector(
    (state) => state.restaurants.restaurants
  );

  const loading = useSelector(
    (state) => state.restaurants.loading
  );

  const error = useSelector(
    (state) => state.restaurants.error
  );


  // ==========================================
  // FIND RESTAURANT WHEN EDITING
  // ==========================================

  const restaurant = restaurants.find(
    (item) =>
      String(item.id) === String(id)
  );


  // ==========================================
  // FORMIK
  // ==========================================

  const formik = useFormik({

    enableReinitialize: true,

    initialValues: {

      id: restaurant?.id || "",

      name: restaurant?.name || "",

      cuisine: restaurant?.cuisine || "",

      rating: restaurant?.rating || "",

      deliveryTime:
        restaurant?.deliveryTime || "",

      price: restaurant?.price || "",

      image: restaurant?.image || "",

      discount: restaurant?.discount || "",

      description:
        restaurant?.description || "",

    },


    // ==========================================
    // VALIDATION
    // ==========================================

    validationSchema: Yup.object({

      id: Yup.number()
        .required(
          t("restaurantForm.validation.idRequired")
        )
        .test(
          "unique-id",
          t("restaurantForm.validation.idExists"),
          function (value) {

            if (!value) {
              return true;
            }

            const duplicateRestaurant =
              restaurants.find(
                (restaurant) =>
                  Number(restaurant.id) === Number(value) &&
                  String(restaurant.id) !== String(id)
              );

            return !duplicateRestaurant;

          }
        ),


      name: Yup.string()
        .required(
          t("restaurantForm.validation.nameRequired")
        )
        .test(
          "unique-name",
          t("restaurantForm.validation.nameExists"),
          function (value) {

            if (!value) {
              return true;
            }

            const enteredName =
              value.trim().toLowerCase();


            const duplicateRestaurant =
              restaurants.find(
                (restaurant) =>
                  String(restaurant.name)
                    .trim()
                    .toLowerCase() === enteredName &&
                  String(restaurant.id) !== String(id)
              );

            return !duplicateRestaurant;

          }
        ),


      cuisine: Yup.string()
        .required(
          t("restaurantForm.validation.cuisineRequired")
        ),


      rating: Yup.number()
        .min(
          0,
          t("restaurantForm.validation.ratingMin")
        )
        .max(
          5,
          t("restaurantForm.validation.ratingMax")
        )
        .required(
          t("restaurantForm.validation.ratingRequired")
        ),


      deliveryTime: Yup.string()
        .required(
          t("restaurantForm.validation.deliveryRequired")
        ),


      price: Yup.number()
        .min(
          0,
          t("restaurantForm.validation.priceMin")
        )
        .required(
          t("restaurantForm.validation.priceRequired")
        ),


      image: Yup.string()
        .required(
          t("restaurantForm.validation.imageRequired")
        ),


      discount: Yup.string()
        .required(
          t("restaurantForm.validation.discountRequired")
        ),


      description: Yup.string()
        .required(
          t("restaurantForm.validation.descriptionRequired")
        ),

    }),


    // ==========================================
    // SUBMIT
    // ==========================================

    onSubmit: async (values) => {

      try {

        /*
         * Sanitize user-controlled text
         */

        const sanitizedData = {

          name: DOMPurify.sanitize(
            values.name,
            {
              ALLOWED_TAGS: [],
              ALLOWED_ATTR: []
            }
          ).trim(),


          cuisine: DOMPurify.sanitize(
            values.cuisine,
            {
              ALLOWED_TAGS: [],
              ALLOWED_ATTR: []
            }
          ).trim(),


          deliveryTime: DOMPurify.sanitize(
            values.deliveryTime,
            {
              ALLOWED_TAGS: [],
              ALLOWED_ATTR: []
            }
          ).trim(),


          image: DOMPurify.sanitize(
            values.image,
            {
              ALLOWED_TAGS: [],
              ALLOWED_ATTR: []
            }
          ).trim(),


          discount: DOMPurify.sanitize(
            values.discount,
            {
              ALLOWED_TAGS: [],
              ALLOWED_ATTR: []
            }
          ).trim(),


          description: DOMPurify.sanitize(
            values.description,
            {
              ALLOWED_TAGS: [],
              ALLOWED_ATTR: []
            }
          ).trim(),


          rating: Number(values.rating),

          price: Number(values.price),

        };


        // ==========================================
        // UPDATE RESTAURANT
        // ==========================================

        if (isEditMode) {

          await dispatch(
            updateRestaurant({

              id: id,

              restaurantData: sanitizedData,

            })
          ).unwrap();

        }


        // ==========================================
        // CREATE RESTAURANT
        // ==========================================

        else {

          await dispatch(
            createRestaurant({

              id: Number(values.id),

              ...sanitizedData,

            })
          ).unwrap();

        }


        navigate("/restaurants");

      } catch (error) {

        console.error(
          "Restaurant operation failed:",
          error
        );

      }

    },

  });


  // ==========================================
  // REDIRECT IF RESTAURANT DOES NOT EXIST
  // ==========================================

  useEffect(() => {

    if (
      isEditMode &&
      restaurants.length > 0 &&
      !restaurant
    ) {

      navigate("/restaurants");

    }

  }, [
    isEditMode,
    restaurants,
    restaurant,
    navigate
  ]);


  // ==========================================
  // RETURN
  // ==========================================

  return (

    <div className="restaurant-form-page">

      <div className="restaurant-form-container">


        {/* ==========================================
            TITLE
            ========================================== */}

        <h1>

          {isEditMode
            ? t("restaurantForm.editTitle")
            : t("restaurantForm.addTitle")}

        </h1>


        {/* ==========================================
            ERROR
            ========================================== */}

        {error && (

          <div className="auth-error-box">

            {error}

          </div>

        )}


        <form
          onSubmit={formik.handleSubmit}
          className="restaurant-form"
        >


          {/* ==========================================
              RESTAURANT ID
              ========================================== */}

          {!isEditMode && (

            <div className="form-group">

              <label htmlFor="id">
                {t("restaurantForm.restaurantId")}
              </label>


              <input
                id="id"
                name="id"
                type="number"
                value={formik.values.id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />


              {formik.touched.id &&
                formik.errors.id && (

                  <p className="error-message">
                    {formik.errors.id}
                  </p>

                )}

            </div>

          )}


          {/* ==========================================
              NAME
              ========================================== */}

          <div className="form-group">

            <label htmlFor="name">
              {t("restaurantForm.name")}
            </label>


            <input
              id="name"
              name="name"
              type="text"
              placeholder={t(
                "restaurantForm.namePlaceholder"
              )}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />


            {formik.touched.name &&
              formik.errors.name && (

                <p className="error-message">
                  {formik.errors.name}
                </p>

              )}

          </div>


          {/* ==========================================
              CUISINE
              ========================================== */}

          <div className="form-group">

            <label htmlFor="cuisine">
              {t("restaurantForm.cuisine")}
            </label>


            <input
              id="cuisine"
              name="cuisine"
              type="text"
              placeholder={t(
                "restaurantForm.cuisinePlaceholder"
              )}
              value={formik.values.cuisine}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />


            {formik.touched.cuisine &&
              formik.errors.cuisine && (

                <p className="error-message">
                  {formik.errors.cuisine}
                </p>

              )}

          </div>


          {/* ==========================================
              RATING
              ========================================== */}

          <div className="form-group">

            <label htmlFor="rating">
              {t("restaurantForm.rating")}
            </label>


            <input
              id="rating"
              name="rating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={formik.values.rating}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />


            {formik.touched.rating &&
              formik.errors.rating && (

                <p className="error-message">
                  {formik.errors.rating}
                </p>

              )}

          </div>


          {/* ==========================================
              DELIVERY TIME
              ========================================== */}

          <div className="form-group">

            <label htmlFor="deliveryTime">
              {t("restaurantForm.deliveryTime")}
            </label>


            <input
              id="deliveryTime"
              name="deliveryTime"
              type="text"
              placeholder={t(
                "restaurantForm.deliveryTimePlaceholder"
              )}
              value={formik.values.deliveryTime}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />


            {formik.touched.deliveryTime &&
              formik.errors.deliveryTime && (

                <p className="error-message">
                  {formik.errors.deliveryTime}
                </p>

              )}

          </div>


          {/* ==========================================
              PRICE
              ========================================== */}

          <div className="form-group">

            <label htmlFor="price">
              {t("restaurantForm.price")}
            </label>


            <input
              id="price"
              name="price"
              type="number"
              min="0"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />


            {formik.touched.price &&
              formik.errors.price && (

                <p className="error-message">
                  {formik.errors.price}
                </p>

              )}

          </div>


          {/* ==========================================
              IMAGE URL
              ========================================== */}

          <div className="form-group">

            <label htmlFor="image">
              {t("restaurantForm.imageUrl")}
            </label>


            <input
              id="image"
              name="image"
              type="text"
              placeholder={t(
                "restaurantForm.imagePlaceholder"
              )}
              value={formik.values.image}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />


            {formik.touched.image &&
              formik.errors.image && (

                <p className="error-message">
                  {formik.errors.image}
                </p>

              )}

          </div>


          {/* ==========================================
              DISCOUNT
              ========================================== */}

          <div className="form-group">

            <label htmlFor="discount">
              {t("restaurantForm.discount")}
            </label>


            <input
              id="discount"
              name="discount"
              type="text"
              placeholder={t(
                "restaurantForm.discountPlaceholder"
              )}
              value={formik.values.discount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />


            {formik.touched.discount &&
              formik.errors.discount && (

                <p className="error-message">
                  {formik.errors.discount}
                </p>

              )}

          </div>


          {/* ==========================================
              DESCRIPTION
              ========================================== */}

          <div className="form-group">

            <label htmlFor="description">
              {t("restaurantForm.description")}
            </label>


            <textarea
              id="description"
              name="description"
              rows="4"
              placeholder={t(
                "restaurantForm.descriptionPlaceholder"
              )}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />


            {formik.touched.description &&
              formik.errors.description && (

                <p className="error-message">
                  {formik.errors.description}
                </p>

              )}

          </div>


          {/* ==========================================
              SUBMIT
              ========================================== */}

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >

            {loading
              ? t("restaurantForm.saving")
              : isEditMode
                ? t("restaurantForm.updateRestaurant")
                : t("restaurantForm.addRestaurant")}

          </button>


          {/* ==========================================
              CANCEL
              ========================================== */}

          <button
            type="button"
            className="auth-submit"
            onClick={() =>
              navigate("/restaurants")
            }
          >

            {t("restaurantForm.cancel")}

          </button>


        </form>

      </div>

    </div>

  );

}


export default RestaurantForm;