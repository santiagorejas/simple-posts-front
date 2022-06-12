import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import { useHttp } from "../../hooks/use-http";
import * as Yup from "yup";

import classes from "./NewComment.module.css";

const NewComment = (props) => {
    const auth = useContext(AuthContext);
    const { isLoading, error, cleaarError, sendRequest } = useHttp();

    const formik = useFormik({
        initialValues: {
            comment: "",
        },
        validationSchema: Yup.object({
            comment: Yup.string()
                .max(150, "The comment must be 150 characters or less.")
                .trim()
                .required("Required."),
        }),
        onSubmit: async (values, actions) => {
            try {
                const data = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}api/comment`,
                    "POST",
                    JSON.stringify({
                        content: values.comment,
                        post: props.postId,
                    }),
                    {
                        Authorization: `Bearer ${auth.token}`,
                        "Content-Type": "application/json",
                    }
                );
                props.onNewComment(data.comment);
            } catch (err) {}

            actions.resetForm({
                values: {
                    comment: "",
                },
            });
        },
    });

    return (
        <>
            <h2 className="section-subtitle">Add comment</h2>
            <form className={classes["comment"]} onSubmit={formik.handleSubmit}>
                <TextField
                    id="comment"
                    name="comment"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.comment}
                    style={{ width: "90%" }}
                    className="form__input "
                    multiline
                    rows={4}
                />
                {formik.errors.comment && formik.touched.comment ? (
                    <p className="invalid-text">{formik.errors.comment}</p>
                ) : null}
                <Button
                    className={`form-btn`}
                    type="submit"
                    variant="contained"
                    margin="normal"
                >
                    Comment
                </Button>
            </form>
        </>
    );
};

export default NewComment;
