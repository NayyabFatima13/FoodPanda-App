import { useFormik } from "formik";
import * as Yup from "yup";

function Checkout({ cart, total }) {

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
                .min(3, "Name must be at least 3 characters")
                .required("Full name is required"),

            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),

            phone: Yup.string()
                .matches(
                    /^[0-9]{10,15}$/,
                    "Enter a valid phone number"
                )
                .required("Phone number is required"),

            address: Yup.string()
                .min(10, "Please enter a complete address")
                .required("Delivery address is required"),

            city: Yup.string()
                .required("City is required"),

            paymentMethod: Yup.string()
                .required("Please select a payment method")

        }),

        onSubmit: (values) => {

            const order = {
                customer: values,
                items: cart,
                total: total
            };

            console.log("ORDER:", order);

            onPlaceOrder(order);
        }

    });


    return (

        <div className="checkout-container">

            <h2>Checkout</h2>


            <form onSubmit={formik.handleSubmit}>

                {/* FULL NAME */}

                <div className="form-group">

                    <label>
                        Full Name
                    </label>

                    <input
                        type="text"
                        name="fullName"
                        placeholder="Enter your full name"
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    {formik.touched.fullName &&
                        formik.errors.fullName && (

                            <p className="error">
                                {formik.errors.fullName}
                            </p>

                        )}

                </div>


                {/* EMAIL */}

                <div className="form-group">

                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    {formik.touched.email &&
                        formik.errors.email && (

                            <p className="error">
                                {formik.errors.email}
                            </p>

                        )}

                </div>


                {/* PHONE */}

                <div className="form-group">

                    <label>
                        Phone Number
                    </label>

                    <input
                        type="tel"
                        name="phone"
                        placeholder="03XXXXXXXXX"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    {formik.touched.phone &&
                        formik.errors.phone && (

                            <p className="error">
                                {formik.errors.phone}
                            </p>

                        )}

                </div>


                {/* ADDRESS */}

                <div className="form-group">

                    <label>
                        Delivery Address
                    </label>

                    <textarea
                        name="address"
                        placeholder="Enter your complete delivery address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    {formik.touched.address &&
                        formik.errors.address && (

                            <p className="error">
                                {formik.errors.address}
                            </p>

                        )}

                </div>


                {/* CITY */}

                <div className="form-group">

                    <label>
                        City
                    </label>

                    <input
                        type="text"
                        name="city"
                        placeholder="Enter your city"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    {formik.touched.city &&
                        formik.errors.city && (

                            <p className="error">
                                {formik.errors.city}
                            </p>

                        )}

                </div>


                {/* PAYMENT */}

                <div className="form-group">

                    <label>
                        Payment Method
                    </label>

                    <select
                        name="paymentMethod"
                        value={formik.values.paymentMethod}
                        onChange={formik.handleChange}
                    >

                        <option value="Cash on Delivery">
                            Cash on Delivery
                        </option>

                        <option value="Card">
                            Credit / Debit Card
                        </option>

                    </select>

                </div>


                {/* SUMMARY */}

                <div className="checkout-summary">

                    <h3>
                        Order Summary
                    </h3>

                    <p>
                        Items: {cart.length}
                    </p>

                    <p>
                        Total: Rs. {total}
                    </p>

                </div>


                <button 
                
                    type="submit"
                    className="place-order-btn"
                >
                    Place Order
                </button>

            </form>

        </div>

    );

}

export default Checkout;