import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Section from "../UI/Section";

import classes from "./SearchBar.module.css";

const SearchBar = (props) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      searchInput: "",
    },
    onSubmit: (values, actions) => {
      actions.resetForm({
        values: {
          searchInput: "",
        },
      });

      let currentUrlParams = new URLSearchParams(window.location.search);
      currentUrlParams.set("name", values.searchInput);
      currentUrlParams.set("page", 1);
      navigate(window.location.pathname + "?" + currentUrlParams.toString());
    },
  });

  return (
    <Section className={props.className} style={{ backgroundColor: "green" }}>
      <div className={classes["search-bar"]}>
        <form
          className={classes["search-bar__grid-container"]}
          onSubmit={formik.handleSubmit}
        >
          <TextField
            id="searchInput"
            name="searchInput"
            type="text"
            className={classes["search-bar__search-input"]}
            margin="normal"
            size="normal"
            onChange={formik.handleChange}
            onBlur={formik.searchInput}
            value={formik.values.searchInput}
          />
          <Button
            variant="contained"
            type="submit"
            margin="normal"
            className={`form-btn ${classes["search-bar__btn"]}`}
          >
            <i className="fas fa-search"></i>
          </Button>
          <Button
            variant="contained"
            type="submit"
            margin="normal"
            onClick={() => navigate("/post/create")}
            className={`form-btn ${classes["search-bar__btn"]}`}
          >
            <i className="fas fa-plus-square"></i>
          </Button>
        </form>
      </div>
    </Section>
  );
};

export default SearchBar;
