import classes from "./Section.module.css";

const Section = (props) => {
  return (
    <div className={`${props.className} ${classes["section"]} }`}>
      {props.children}
    </div>
  );
};

export default Section;
