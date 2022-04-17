import { useNavigate, useSearchParams } from "react-router-dom";
import Section from "../UI/Section";

import classes from "./Categories.module.css";

const Categories = (props) => {
  const navigate = useNavigate();

  const changeCategory = (category) => {
    if (window.location.pathname === "/post") {
      let currentUrlParams = new URLSearchParams(window.location.search);
      currentUrlParams.set("category", category);
      navigate(window.location.pathname + "?" + currentUrlParams.toString());
    } else {
      navigate(`/post?category=${category}`);
    }
  };

  const [searchParams] = useSearchParams();

  return (
    <Section className={`${props.className} ${classes["categories"]}`}>
      <h1 className={classes["categories__title"]}>Categories</h1>
      <ul className={classes["categories__container"]}>
        <li
          className={classes["categories__element"]}
          onClick={changeCategory.bind(null, "art")}
        >
          <i class="fas fa-paint-brush"></i>
          <span>Art</span>
        </li>
        <li
          className={classes["categories__element"]}
          onClick={changeCategory.bind(null, "hobbies")}
        >
          <i class="fas fa-pencil-ruler"></i>
          <span>Hobbies</span>
        </li>
        <li
          className={classes["categories__element"]}
          onClick={changeCategory.bind(null, "food")}
        >
          <i class="fas fa-hamburger"></i>
          <span>Food</span>
        </li>
        <li
          className={classes["categories__element"]}
          onClick={changeCategory.bind(null, "drinks")}
        >
          <i class="fas fa-cocktail"></i>
          <span>Drinks</span>
        </li>
        <li
          className={classes["categories__element"]}
          onClick={changeCategory.bind(null, "gifts")}
        >
          <i class="fas fa-gift"></i>
          <span>Gifts</span>
        </li>
        <li
          className={classes["categories__element"]}
          onClick={changeCategory.bind(null, "home")}
        >
          <i class="fas fa-home"></i>
          <span>Home</span>
        </li>
        <li
          className={classes["categories__element"]}
          onClick={changeCategory.bind(null, "health")}
        >
          <i class="fas fa-heartbeat"></i>
          <span>Health</span>
        </li>
        <li
          className={classes["categories__element"]}
          onClick={changeCategory.bind(null, "clothing")}
        >
          <i class="fas fa-tshirt"></i>
          <span>Clothing</span>
        </li>
        <li
          className={classes["categories__element"]}
          onClick={changeCategory.bind(null, "books")}
        >
          <i class="fas fa-book"></i>
          <span>Books</span>
        </li>
        <li
          className={classes["categories__element"]}
          onClick={changeCategory.bind(null, "music")}
        >
          <i class="fas fa-music"></i>
          <span>Music</span>
        </li>
        <li
          className={classes["categories__element"]}
          onClick={changeCategory.bind(null, "sports")}
        >
          <i class="fas fa-futbol"></i>
          <span>Sports</span>
        </li>
        <li
          className={classes["categories__element"]}
          onClick={changeCategory.bind(null, "holidays")}
        >
          <i class="fas fa-candy-cane"></i>
          <span>Holidays</span>
        </li>
        <li
          className={classes["categories__element"]}
          onClick={changeCategory.bind(null, "travel")}
        >
          <i class="fas fa-globe-americas"></i>
          <span>Travel</span>
        </li>
        <li
          className={classes["categories__element"]}
          onClick={changeCategory.bind(null, "quotes")}
        >
          <i class="fas fa-quote-left"></i>
          <span>Quotes</span>
        </li>
        <li
          className={classes["categories__element"]}
          onClick={changeCategory.bind(null, "animals")}
        >
          <i class="fas fa-cat"></i>
          <span>Animals</span>
        </li>
        <li
          className={classes["categories__element"]}
          onClick={changeCategory.bind(null, "design")}
        >
          <i class="fas fa-drafting-compass"></i>
          <span>Design</span>
        </li>
      </ul>
    </Section>
  );
};

export default Categories;
