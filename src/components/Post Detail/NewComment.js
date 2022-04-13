import { useFormik } from "formik";
import * as Yup from "yup";

import classes from "./NewComment.module.css";

const NewComment = (props) => {
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: Yup.object({
      comment: Yup.string()
        .max(150, "Must be 150 characters or less.")
        .trim()
        .required("Required."),
    }),
    onSubmit: (values, actions) => {
      console.log(values);
      actions.resetForm({
        values: {
          comment: "",
        },
      });
    },
  });

  console.log(formik.touched);

  return (
    <form className={classes["comment"]} onSubmit={formik.handleSubmit}>
      <textarea
        className="form-element"
        id="comment"
        name="comment"
        placeholder="Write a comment!"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.comment}
      />
      {formik.errors.comment && formik.touched.comment ? (
        <p className="invalid-label">{formik.errors.comment}</p>
      ) : null}
      <button
        className={`form-button ${classes["comment__submit-btn"]}`}
        type="submit"
      >
        Comment
      </button>
    </form>
  );
};

export default NewComment;
