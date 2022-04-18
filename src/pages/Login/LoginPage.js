import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Section from "../../components/UI/Section";
import { AuthContext } from "../../context/auth-context";
import { useHttp } from "../../hooks/use-http";

const LoginPage = (props) => {
  const { isLoading, error, clearError, sendRequest } = useHttp();

  const navigate = useNavigate();

  const auth = useContext(AuthContext);

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
      console.log(values);
      let data;
      try {
        data = await sendRequest(
          "http://localhost:5000/api/user/login",
          "POST",
          JSON.stringify({
            nickname: formik.values.nickname,
            password: formik.values.password,
          }),
          {
            "Content-Type": "application/json",
          }
        );
      } catch (err) {}

      actions.resetForm({
        values: {
          password: "",
        },
      });

      // TODO: borrar luego
      clearError();

      console.log(error);

      if (!error) {
        auth.login(data.id, data.token);

        return navigate("/");
      }
    },
  });

  return (
    <Section className={props.className}>
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
    </Section>
  );
};

export default LoginPage;
