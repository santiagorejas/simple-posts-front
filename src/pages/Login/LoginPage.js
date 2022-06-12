import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Modal from "../../components/UI/Modal";
import { AuthContext } from "../../context/auth-context";
import ProfileContext from "../../context/profile-context";
import { useHttp } from "../../hooks/use-http";

const LoginPage = (props) => {
    const { isLoading, error, clearError, sendRequest } = useHttp();

    const navigate = useNavigate();

    const auth = useContext(AuthContext);
    const profile = useContext(ProfileContext);

    const formik = useFormik({
        initialValues: {
            nickname: "",
            password: "",
        },
        validationSchema: Yup.object({
            nickname: Yup.string()
                .required("Nickname required.")
                .trim()
                .min(3, "Nickname must have at least 3 characters."),
            password: Yup.string()
                .required("Password required.")
                .min(6, "Password must have at least 6 characters."),
        }),
        onSubmit: async (values, actions) => {
            let data;
            try {
                data = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}api/user/login`,
                    "POST",
                    JSON.stringify({
                        nickname: values.nickname,
                        password: values.password,
                    }),
                    {
                        "Content-Type": "application/json",
                    }
                );
                profile.setLikes(data.likes);
                auth.login(data.id, data.token);

                actions.resetForm({
                    values: {
                        password: "",
                    },
                });

                return navigate("/");
            } catch (err) {}
        },
    });

    return (
        <>
            {error && <Modal onClose={clearError}>{error}</Modal>}
            <div className={props.className}>
                <h1 className="section-title" style={{ textAlign: "center" }}>
                    Login Form
                </h1>
                <form className="form" onSubmit={formik.handleSubmit}>
                    <TextField
                        label="Nickname"
                        id="nickname"
                        name="nickname"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.comment}
                        autoComplete="off"
                        margin="normal"
                    />
                    {formik.errors.nickname && formik.touched.nickname && (
                        <p className="invalid-text">{formik.errors.nickname}</p>
                    )}
                    <TextField
                        label="Password"
                        type="password"
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        autoComplete="off"
                        margin="normal"
                    />
                    {formik.errors.password && formik.touched.password && (
                        <p className="invalid-text">{formik.errors.password}</p>
                    )}
                    <Button
                        className="form-btn"
                        variant="contained"
                        type="submit"
                        margin="normal"
                    >
                        Login
                    </Button>
                </form>
            </div>
        </>
    );
};

export default LoginPage;
