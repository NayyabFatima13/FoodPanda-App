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
    login
} from "../redux/slices/authSlice";


function Login() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);

    const [loginError, setLoginError] = useState("");


    const formik = useFormik({

        initialValues: {
            email: "",
            password: ""
        },


        validationSchema: Yup.object({

            email: Yup.string()
                .email("Please enter a valid email")
                .required("Email is required"),


            password: Yup.string()
                .min(
                    6,
                    "Password must be at least 6 characters"
                )
                .required("Password is required")

        }),


        onSubmit: (values) => {

            setLoginError("");

            const result = dispatch(
                login(
                    values.email,
                    values.password
                )
            );


            if (!result.success) {

                setLoginError(
                    result.message
                );

                return;
            }


            navigate("/dashboard");

        }

    });


    return (

        <div className="auth-page">

            <div className="auth-card">

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
                    Welcome back!
                </h1>


                <p className="auth-subtitle">

                    Log in to continue ordering
                    your favorite food.

                </p>


                {loginError && (

                    <div className="auth-error-box">

                        {loginError}

                    </div>

                )}


                <form onSubmit={formik.handleSubmit}>


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

                                placeholder="Enter your password"

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


                    <div className="forgot-password">

                        <button type="button">

                            Forgot password?

                        </button>

                    </div>


                    <button
                        type="submit"
                        className="auth-submit"
                    >

                        Log in

                    </button>

                </form>


                <div className="auth-divider">

                    <span>OR</span>

                </div>


                <p className="auth-switch">

                    Don't have an account?

                    <Link to="/register">
                        Sign up
                    </Link>

                </p>

            </div>

        </div>

    );
}


export default Login;