import "./ActionButtonColor.css"

// eslint-disable-next-line react/prop-types
const ActionButtonTransparent = ({ key, href, text }) => {
    return (
        <a
            key={key}
            href={href}
            className="action-button-transparent"
        >
            {text}
        </a>
    );
}

export default ActionButtonTransparent;