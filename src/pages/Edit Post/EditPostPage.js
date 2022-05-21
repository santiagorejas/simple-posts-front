import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import { useHttp } from "../../hooks/use-http";
import { categories } from "../../constants/categories";
import * as Yup from "yup";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import classes from "./EditPostPage.module.css";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const EditPostPage = (props) => {
    const postId = useParams().pid;
    const navigate = useNavigate();
    const { userId, token } = useContext(AuthContext);
    const [hasAcces, setHasAcces] = useState(true);
    const { isLoading, error, clearError, sendRequest } = useHttp();
    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            category: "art",
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .trim()
                .max(30, "The title should not be longer than 30 characters."),
            description: Yup.string()
                .trim()
                .max(
                    150,
                    "Description should not be longer than 150 characters."
                ),
            category: Yup.string(),
        }),
        onSubmit: async (values, actions) => {
            try {
                const data = await sendRequest(
                    `http://localhost:5000/api/post/${postId}`,
                    "PATCH",
                    JSON.stringify({
                        title: values.title,
                        description: values.description,
                        category: values.category,
                    }),
                    {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                );
            } catch (err) {}
        },
    });

    useEffect(() => {
        const getPostDetails = async () => {
            try {
                const data = await sendRequest(
                    `http://localhost:5000/api/post/${postId}`
                );

                if (data.post.creator._id !== userId) {
                    setHasAcces(false);
                    return;
                } else {
                    setHasAcces(true);
                }

                formik.setFieldValue("title", data.post.title);
                formik.setFieldValue("description", data.post.description);
                formik.setFieldValue("category", data.post.category);
            } catch (err) {}
        };

        getPostDetails();
    }, [postId, sendRequest, userId]);

    return (
        <div className={classes["edit-post"]}>
            <h1 className="section-title">Edit Post</h1>
            {isLoading && <LoadingSpinner />}
            {!isLoading && (
                <form
                    className={`form ${classes["edit-post__form"]}`}
                    onSubmit={formik.handleSubmit}
                >
                    <TextField
                        label="Title"
                        id="title"
                        name="title"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                        autoComplete="off"
                        disabled={!hasAcces}
                    />
                    {formik.errors.title && formik.touched.title && (
                        <p className="invalid-text">{formik.errors.title}</p>
                    )}
                    <Select
                        label="Category"
                        id="category"
                        name="category"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        autoComplete="off"
                        disabled={!hasAcces}
                    >
                        {categories.map((category) => (
                            <MenuItem value={category} key={category}>
                                {category.charAt(0).toUpperCase() +
                                    category.slice(1)}
                            </MenuItem>
                        ))}
                    </Select>
                    {formik.errors.category && formik.touched.category && (
                        <p className="invalid-text">{formik.errors.category}</p>
                    )}
                    <TextField
                        id="description"
                        name="description"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                        className="form__input "
                        multiline
                        rows={4}
                        disabled={!hasAcces}
                    />
                    {formik.errors.description &&
                        formik.touched.description && (
                            <p className="invalid-text">
                                {formik.errors.description}
                            </p>
                        )}
                    <Button
                        className="form-btn"
                        variant="contained"
                        type="submit"
                        disabled={!hasAcces}
                    >
                        Edit Post
                    </Button>
                </form>
            )}
            <button
                onClick={() => navigate(`/post/${postId}`)}
                className={classes["edit-post__return-btn"]}
            >
                Return to post
            </button>
        </div>
    );
};

export default EditPostPage;
