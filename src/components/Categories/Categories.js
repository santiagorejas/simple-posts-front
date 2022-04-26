import { useNavigate } from "react-router-dom";
import Section from "../UI/Section";

import classes from "./Categories.module.css";

const Categories = (props) => {
  const navigate = useNavigate();

  const changeCategory = (category) => {
    const pathName = window.location.pathname;
    if (pathName === "/post" || pathName.startsWith("/user")) {
      let currentUrlParams = new URLSearchParams(window.location.search);
      currentUrlParams.set("category", category);
      currentUrlParams.set("page", 1);
      navigate(pathName + "?" + currentUrlParams.toString());
    } else {
      navigate(`/post?category=${category}`);
    }
  };

  return (
    <Section className={`${props.className} ${classes["categories"]}`}>
      <h1 className={classes["categories__title"]}>Categories</h1>
      <ul className={classes["categories__container"]}>
        <li
          className={classes["categories__element"]}
          onClick={changeCategory.bind(null, "art")}
        >
          <i className="fas fa-paint-brush"></i>
          <span>Art</span>
        </li>
        <li
          className={classes["categories__element"]}
          onClick={changeCategory.bind(null, "hobbies")}
        >
          <i className="fas fa-pencil-ruler"></i>
          <span>Hobbies</span>
        </li>
        <li
          className={classes["categories__element"]}
          onClick={changeCategory.bind(null, "food")}
        >
          <i className="fas fa-hamburger"></i>
          <span>Food</span>
        </li>
        <li
          className={classes["categories__element"]}
          onClick={changeCategory.bind(null, "drinks")}
        >
          <i className="fas fa-cocktail"></i>
          <span>Drinks</span>
        </li>
        <li
          className={classes["categories__element"]}
          onClick={changeCategory.bind(null, "gifts")}
        >
          <i className="fas fa-gift"></i>
          <span>Gifts</span>
        </li>
        <li
          className={classes["categories__element"]}
          onClick={changeCategory.bind(null, "home")}
        >
          <i className="fas fa-home"></i>
          <span>Home</span>
        </li>
        <li
          className={classes["categories__element"]}
          onClick={changeCategory.bind(null, "health")}
        >
          <i className="fas fa-heartbeat"></i>
          <span>Health</span>
        </li>
        <li
          className={classes["categories__element"]}
          onClick={changeCategory.bind(null, "clothing")}
        >
          <i className="fas fa-tshirt"></i>
          <span>Clothing</span>
        </li>
        <li
          className={classes["categories__element"]}
          onClick={changeCategory.bind(null, "books")}
        >
          <i className="fas fa-book"></i>
          <span>Books</span>
        </li>
        <li
          className={classes["categories__element"]}
          onClick={changeCategory.bind(null, "music")}
        >
          <i className="fas fa-music"></i>
          <span>Music</span>
        </li>
        <li
          className={classes["categories__element"]}
          onClick={changeCategory.bind(null, "sports")}
        >
          <i className="fas fa-futbol"></i>
          <span>Sports</span>
        </li>
        <li
          className={classes["categories__element"]}
          onClick={changeCategory.bind(null, "holidays")}
        >
          <i className="fas fa-candy-cane"></i>
          <span>Holidays</span>
        </li>
        <li
          className={classes["categories__element"]}
          onClick={changeCategory.bind(null, "travel")}
        >
          <i className="fas fa-globe-americas"></i>
          <span>Travel</span>
        </li>
        <li
          className={classes["categories__element"]}
          onClick={changeCategory.bind(null, "quotes")}
        >
          <i className="fas fa-quote-left"></i>
          <span>Quotes</span>
        </li>
        <li
          className={classes["categories__element"]}
          onClick={changeCategory.bind(null, "animals")}
        >
          <i className="fas fa-cat"></i>
          <span>Animals</span>
        </li>
        <li
          className={classes["categories__element"]}
          onClick={changeCategory.bind(null, "design")}
        >
          <i className="fas fa-drafting-compass"></i>
          <span>Design</span>
        </li>
      </ul>
    </Section>
  );
};

export default Categories;
