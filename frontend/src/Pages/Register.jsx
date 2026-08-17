import foodpandaLogo from "../assets/foodpanda-logo-horizontal-1.png";

import { useState } from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    Eye,
    EyeOff,
    ArrowLeft
} from "lucide-react";

import { useFormik } from "formik";

import * as Yup from "yup";

import { useDispatch } from "react-redux";

import {
    register
} from "../redux/slices/authSlice";


function Register() {

    const navigate = useNavigate();

    const dispatch = useDispatch();


    const [showPassword, setShowPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);


    const formik = useFormik({

        initialValues: {

            name: "",

            email: "",

            password: "",

            confirmPassword: ""

        },


        validationSchema: Yup.object({

            name: Yup.string()

                .min(
                    2,
                    "Name must be at least 2 characters"
                )

                .required("Name is required"),


            email: Yup.string()

                .email(
                    "Please enter a valid email"
                )

                .required(
                    "Email is required"
                ),


            password: Yup.string()

                .min(
                    8,
                    "Password must be at least 8 characters"
                )

                .matches(
                    /[A-Z]/,
                    "Password must contain an uppercase letter"
                )

                .matches(
                    /[0-9]/,
                    "Password must contain a number"
                )

                .required(
                    "Password is required"
                ),


            confirmPassword: Yup.string()

                .oneOf(
                    [Yup.ref("password")],
                    "Passwords must match"
                )

                .required(
                    "Please confirm your password"
                )

        }),


        onSubmit: (values) => {

            dispatch(
                register(values)
            );

            navigate("/dashboard");

        }

    });


    return (

        <div className="auth-page">

            <div className="auth-card register-card">


                <Link
                    to="/"
                    className="back-home"
                >

                    <ArrowLeft size={18} />

                    Back to home

                </Link>


                <div className="auth-logo">

                    <img
                        src={foodpandaLogo}
                        alt="foodpanda"
                    />

                </div>


                <h1>
                    Create your account
                </h1>


                <p className="auth-subtitle">

                    Sign up and start ordering
                    your favorite food.

                </p>


                <form
                    onSubmit={formik.handleSubmit}
                >


                    {/* NAME */}

                    <div className="form-group">

                        <label htmlFor="name">
                            Full name
                        </label>


                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter your name"

                            value={formik.values.name}

                            onChange={formik.handleChange}

                            onBlur={formik.handleBlur}

                            className={
                                formik.touched.name &&
                                    formik.errors.name
                                    ? "input-error"
                                    : ""
                            }
                        />


                        {formik.touched.name &&
                            formik.errors.name && (

                                <p className="error-message">

                                    {formik.errors.name}

                                </p>

                            )}

                    </div>


                    {/* EMAIL */}

                    <div className="form-group">

                        <label htmlFor="email">
                            Email address
                        </label>


                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"

                            value={formik.values.email}

                            onChange={formik.handleChange}

                            onBlur={formik.handleBlur}

                            className={
                                formik.touched.email &&
                                    formik.errors.email
                                    ? "input-error"
                                    : ""
                            }
                        />


                        {formik.touched.email &&
                            formik.errors.email && (

                                <p className="error-message">

                                    {formik.errors.email}

                                </p>

                            )}

                    </div>


                    {/* PASSWORD */}

                    <div className="form-group">

                        <label htmlFor="password">
                            Password
                        </label>


                        <div className="password-wrapper">

                            <input
                                id="password"
                                name="password"

                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }

                                placeholder="Create a password"

                                value={
                                    formik.values.password
                                }

                                onChange={
                                    formik.handleChange
                                }

                                onBlur={
                                    formik.handleBlur
                                }

                                className={
                                    formik.touched.password &&
                                        formik.errors.password
                                        ? "input-error"
                                        : ""
                                }
                            />


                            <button
                                type="button"
                                className="password-toggle"

                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                            >

                                {showPassword
                                    ? <EyeOff size={20} />
                                    : <Eye size={20} />
                                }

                            </button>

                        </div>


                        {formik.touched.password &&
                            formik.errors.password && (

                                <p className="error-message">

                                    {formik.errors.password}

                                </p>

                            )}

                    </div>


                    {/* CONFIRM PASSWORD */}

                    <div className="form-group">

                        <label htmlFor="confirmPassword">
                            Confirm password
                        </label>


                        <div className="password-wrapper">

                            <input
                                id="confirmPassword"
                                name="confirmPassword"

                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }

                                placeholder="Confirm your password"

                                value={
                                    formik.values
                                        .confirmPassword
                                }

                                onChange={
                                    formik.handleChange
                                }

                                onBlur={
                                    formik.handleBlur
                                }

                                className={
                                    formik.touched.confirmPassword &&
                                        formik.errors.confirmPassword
                                        ? "input-error"
                                        : ""
                                }
                            />


                            <button
                                type="button"
                                className="password-toggle"

                                onClick={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }
                            >

                                {showConfirmPassword
                                    ? <EyeOff size={20} />
                                    : <Eye size={20} />
                                }

                            </button>

                        </div>


                        {formik.touched.confirmPassword &&
                            formik.errors.confirmPassword && (

                                <p className="error-message">

                                    {
                                        formik.errors
                                            .confirmPassword
                                    }

                                </p>

                            )}

                    </div>


                    <button
                        type="submit"
                        className="auth-submit"
                    >

                        Create account

                    </button>

                </form>


                <p className="auth-switch">

                    Already have an account?

                    <Link to="/login">
                        Log in
                    </Link>

                </p>

            </div>

        </div>

    );
}


export default Register;