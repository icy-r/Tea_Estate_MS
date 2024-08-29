import {color_button} from "../../constants/colors.js";
import "./ActionButtonColor.css";

const styles = {
    button: {
        backgroundColor: color_button,
        padding: "0.5rem 1rem",
        borderRadius: "0.25rem",
        fontSize: "1rem",
        color: "black",
        cursor: "pointer",
        transition: "background-color 0.3s",
        textDecoration: "none",
    },
}

const ActionButtonColor = ({ key, href, text }) => {
    return (
        <a
            key={key}
            href={href}
            // style={styles.button}
            className="action-button-color"
        >
            {text}
        </a>
    );
}

export default ActionButtonColor;