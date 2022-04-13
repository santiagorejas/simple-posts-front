import { useRef, useState } from "react";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Section from "../../components/UI/Section";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../../hooks/use-http";
import { useAuth } from "../../hooks/auth-hook";
import { AuthContext } from "../../context/auth-context";

const SignupPage = (props) => {
  const fileInput = useRef();
  const navigate = useNavigate();
  const auth = useAuth(AuthContext);
  const { isLoading, error, clearError, sendRequest } = useHttp();

  const [pickedFile, setPickedFile] = useState(null);

  const formik = useFormik({
    initialValues: {
      nickname: "",
      email: "",
      password: "",
      image: "",
    },
    validationSchema: Yup.object({
      nickname: Yup.string()
        .required()
        .min(3, "Nickname mut be at least 3 characters long."),
      email: Yup.string().email().required(),
      password: Yup.string()
        .required("Password required.")
        .min(6, "Password must be at least 6 characters long."),
      image: Yup.string(),
    }),
    onSubmit: async (values, actions) => {
      console.log(values);

      const formData = new FormData();
      formData.append("nickname", formik.values.nickname);
      formData.append("email", formik.values.email);
      formData.append("password", formik.values.password);
      formData.append("image", pickedFile);

      try {
        const data = await sendRequest(
          "http://localhost:5000/api/user/signup",
          "POST",
          formData
        );
        navigate("/");
      } catch (err) {}

      actions.resetForm({
        values: {
          nickname: "",
          email: "",
          password: "",
          image: "",
        },
      });
    },
  });

  const pickedHandler = (e) => {
    let pickedFile = null;
    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];
    }
    setPickedFile(pickedFile);
  };

  return (
    <Section className={props.className}>
      <h1 className="section-title" style={{ textAlign: "center" }}>
        Signup Form
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
          label="E-mail"
          id="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.comment}
          autoComplete="off"
          margin="normal"
        />
        {formik.errors.email && formik.touched.email && (
          <p className="invalid-text">{formik.errors.email}</p>
        )}
        <TextField
          label="Password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.comment}
          autoComplete="off"
          margin="normal"
        />
        {formik.errors.password && formik.touched.password && (
          <p className="invalid-text">{formik.errors.password}</p>
        )}
        <Button onClick={() => fileInput.current.click()}>Upload File</Button>
        <input
          ref={fileInput}
          type="file"
          style={{ display: "none" }}
          accept=".jpg,.png,.jpeg"
          onChange={pickedHandler}
        />
        <Button
          className="form-btn"
          variant="contained"
          type="submit"
          margin="normal"
        >
          Signup
        </Button>
      </form>
    </Section>
  );
};

export default SignupPage;
