import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  createRestaurant,
  updateRestaurant,
} from "../redux/slices/restaurantSlice";


function RestaurantForm() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { id } = useParams();

  const isEditMode = Boolean(id);


  const restaurants = useSelector(
    (state) => state.restaurants.restaurants
  );

  const loading = useSelector(
    (state) => state.restaurants.loading
  );

  const error = useSelector(
    (state) => state.restaurants.error
  );


  // Find restaurant when editing

  const restaurant = restaurants.find(
    (item) =>
      String(item.id) === String(id)
  );


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


    validationSchema: Yup.object({

      id: Yup.number()
        .required("Restaurant ID is required"),

      name: Yup.string()
        .required("Restaurant name is required"),

      cuisine: Yup.string()
        .required("Cuisine is required"),

      rating: Yup.number()
        .min(0, "Rating cannot be less than 0")
        .max(5, "Rating cannot be greater than 5")
        .required("Rating is required"),

      deliveryTime: Yup.string()
        .required("Delivery time is required"),

      price: Yup.number()
        .min(0, "Price cannot be negative")
        .required("Price is required"),

      image: Yup.string()
        .required("Image is required"),

      discount: Yup.string()
        .required("Discount is required"),

      description: Yup.string()
        .required("Description is required"),

    }),


    onSubmit: async (values) => {

      try {

        if (isEditMode) {

          await dispatch(
            updateRestaurant({

              id: id,

              restaurantData: {

                name: values.name,

                cuisine: values.cuisine,

                rating: Number(values.rating),

                deliveryTime:
                  values.deliveryTime,

                price: Number(values.price),

                image: values.image,

                discount: values.discount,

                description:
                  values.description,

              },

            })
          ).unwrap();

        } else {

          await dispatch(
            createRestaurant({

              id: Number(values.id),

              name: values.name,

              cuisine: values.cuisine,

              rating: Number(values.rating),

              deliveryTime:
                values.deliveryTime,

              price: Number(values.price),

              image: values.image,

              discount: values.discount,

              description:
                values.description,

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


  // If editing but restaurant doesn't exist

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


  return (

    <div className="restaurant-form-page">

      <div className="restaurant-form-container">

        <h1>

          {isEditMode
            ? "Edit Restaurant"
            : "Add Restaurant"}

        </h1>


        {error && (

          <div className="auth-error-box">

            {error}

          </div>

        )}


        <form
          onSubmit={formik.handleSubmit}
          className="restaurant-form"
        >


          {/* RESTAURANT ID */}

          {!isEditMode && (

            <div className="form-group">

              <label htmlFor="id">

                Restaurant ID

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


          {/* NAME */}

          <div className="form-group">

            <label htmlFor="name">

              Restaurant name

            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter restaurant name"
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


          {/* CUISINE */}

          <div className="form-group">

            <label htmlFor="cuisine">

              Cuisine

            </label>

            <input
              id="cuisine"
              name="cuisine"
              type="text"
              placeholder="e.g. Pakistani"
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


          {/* RATING */}

          <div className="form-group">

            <label htmlFor="rating">

              Rating

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


          {/* DELIVERY TIME */}

          <div className="form-group">

            <label htmlFor="deliveryTime">

              Delivery time

            </label>

            <input
              id="deliveryTime"
              name="deliveryTime"
              type="text"
              placeholder="30-40 min"
              value={
                formik.values.deliveryTime
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.touched.deliveryTime &&
              formik.errors.deliveryTime && (

                <p className="error-message">

                  {
                    formik.errors
                      .deliveryTime
                  }

                </p>

              )}

          </div>


          {/* PRICE */}

          <div className="form-group">

            <label htmlFor="price">

              Price

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


          {/* IMAGE */}

          <div className="form-group">

            <label htmlFor="image">

              Image URL

            </label>

            <input
              id="image"
              name="image"
              type="text"
              placeholder="Enter image URL"
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


          {/* DISCOUNT */}

          <div className="form-group">

            <label htmlFor="discount">

              Discount

            </label>

            <input
              id="discount"
              name="discount"
              type="text"
              placeholder="20% OFF"
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


          {/* DESCRIPTION */}

          <div className="form-group">

            <label htmlFor="description">

              Description

            </label>

            <textarea
              id="description"
              name="description"
              rows="4"
              placeholder="Enter restaurant description"
              value={
                formik.values.description
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.touched.description &&
              formik.errors.description && (

                <p className="error-message">

                  {
                    formik.errors
                      .description
                  }

                </p>

              )}

          </div>


          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >

            {loading
              ? "Saving..."
              : isEditMode
                ? "Update Restaurant"
                : "Add Restaurant"}

          </button>


          <button
            type="button"
            className="auth-submit"
            onClick={() =>
              navigate("/restaurants")
            }
          >

            Cancel

          </button>

        </form>

      </div>

    </div>

  );

}


export default RestaurantForm;