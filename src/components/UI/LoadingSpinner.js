import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className={classes["loading-spinner-container"]}>
      <div className={classes["lds-ellipsis"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
