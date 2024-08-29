import "./ActionButtonColor.css";


// eslint-disable-next-line react/prop-types
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