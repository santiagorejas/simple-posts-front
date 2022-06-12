import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useContext, useRef, useState } from "react";
import Modal from "../../components/UI/Modal";
import { AuthContext } from "../../context/auth-context";
import ProfileContext from "../../context/profile-context";
import { useHttp } from "../../hooks/use-http";
import classes from "./EditAccountPage.module.css";

const EditAccountPage = (props) => {
    const fileInput = useRef();
    const [pickedFile, setPickedFile] = useState(null);
    const profile = useContext(ProfileContext);
    const auth = useContext(AuthContext);
    const { isLoading, error, clearError, sendRequest } = useHttp();

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        onSubmit: async (values, actions) => {
            const formData = new FormData();
            formData.append("image", pickedFile);
            formData.append("email", values.email);

            try {
                const data = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}api/user/edit-account`,
                    "PATCH",
                    formData,
                    {
                        Authorization: `Bearer ${auth.token}`,
                    }
                );
                profile.updateProfile(null, data.image);
            } catch (err) {}
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
        <>
            {error && <Modal onClose={clearError}>{error}</Modal>}
            <div>
                <h1 className="section-title" style={{ textAlign: "center" }}>
                    Edit Account
                </h1>
                <form className="form" onSubmit={formik.handleSubmit}>
                    <TextField
                        label="E-mail"
                        type="email"
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        autoComplete="off"
                        margin="normal"
                    />
                    <Button onClick={() => fileInput.current.click()}>
                        Upload File
                    </Button>
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
                        Edit Account
                    </Button>
                </form>
            </div>
        </>
    );
};

export default EditAccountPage;
