import { useContext, useRef, useState } from "react";
import {
    Button,
    MenuItem,
    Select,
    TextareaAutosize,
    TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { categories } from "../../constants/categories";
import Section from "../../components/UI/Section";
import { useHttp } from "../../hooks/use-http";
import classes from "./CreatePostPage.module.css";
import { AuthContext } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";

const CreatePostPage = (props) => {
    const [pickedFile, setPickedFile] = useState(null);
    const fileInput = useRef();
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const { isLoading, error, clearError, sendRequest } = useHttp();

    if (!auth.isLoggedIn) navigate("/login");

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            category: "art",
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .trim()
                .required()
                .max(30, "The title should not be longer than 30 characters."),
            description: Yup.string(),
            category: Yup.string().required(),
        }),
        onSubmit: async (values, actions) => {
            const formData = new FormData();
            formData.append("title", formik.values.title);
            formData.append("description", formik.values.description);
            formData.append("category", formik.values.category);
            formData.append("image", pickedFile);

            const data = await sendRequest(
                "${process.env.REACT_APP_BACKEND_URL}api/post",
                "POST",
                formData,
                {
                    Authorization: `Bearer ${auth.token}`,
                }
            );

            navigate(`/post/${data.post._id}`);
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
                Create Post
            </h1>
            <form className="form" onSubmit={formik.handleSubmit}>
                <TextField
                    label="Title"
                    id="title"
                    name="title"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                    autoComplete="off"
                    margin="normal"
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
                    className={classes["select"]}
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
                <Button
                    onClick={() => {
                        fileInput.current.click();
                    }}
                >
                    Upload File
                </Button>
                <input
                    ref={fileInput}
                    type="file"
                    style={{ display: "none" }}
                    accept=".jpg,.png,.jpeg"
                    onChange={pickedHandler}
                />
                <TextareaAutosize
                    label="Description"
                    id="description"
                    name="description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                    autoComplete="off"
                    margin="normal"
                    className={classes["description"]}
                />
                {formik.errors.description && formik.touched.description && (
                    <p className="invalid-text">{formik.errors.description}</p>
                )}
                <Button
                    className="form-btn"
                    variant="contained"
                    type="submit"
                    margin="normal"
                >
                    Create Post
                </Button>
            </form>
        </Section>
    );
};

export default CreatePostPage;
