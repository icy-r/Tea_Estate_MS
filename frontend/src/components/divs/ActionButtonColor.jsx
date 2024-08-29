import {color_button} from "../../constants/colors.js";

const styles = {
    button: {
        backgroundColor: color_button,
        padding: "0.5rem 1rem",
        borderRadius: "0.25rem",
        fontSize: "1rem",
        color: "black",
        cursor: "pointer",
        transition: "background-color 0.3s",
        "&:hover": {
            backgroundColor: "#F9AFAF",
        },
    },
}

const ActionButtonColor = ({ key, href, text }) => {
    return (
        <a
            key={key}
            href={href}
            style={styles.button}
            className="hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
        >
            {text}
        </a>
    );
}

export default ActionButtonColor;