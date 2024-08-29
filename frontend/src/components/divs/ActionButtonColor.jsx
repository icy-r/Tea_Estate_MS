import "./ActionButtonColor.css";


// eslint-disable-next-line react/prop-types
const ActionButtonColor = ({ index, href, text, onclickfun }) => {
    return (
        <a
            key={index}
            href={href}
            // style={styles.button}
            className="action-button-color"
            onClick={onclickfun ? onclickfun : undefined}
        >
            {text}
        </a>
    );
}

export default ActionButtonColor;