import { createPortal } from "react-dom";

import classes from "./Modal.module.css";

const Backdrop = (props) => {
    return (
        <div
            className={classes["backdrop"]}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    props.onClose();
                }
            }}
        >
            {props.children}
        </div>
    );
};

const Modal = (props) => {
    const modalRoot = document.getElementById("modal-root");

    return createPortal(
        <Backdrop onClose={props.onClose}>
            <div className={classes["modal"]}>
                <div className={classes["modal__header"]}>
                    <i
                        className={`fa-solid fa-xmark`}
                        onClick={props.onClose}
                    ></i>
                </div>
                {props.children}
            </div>
        </Backdrop>,
        modalRoot
    );
};

export default Modal;
