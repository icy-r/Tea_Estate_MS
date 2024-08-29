import "./ActionButtonColor.css"

// eslint-disable-next-line react/prop-types
const ActionButtonTransparent = ({ key, href, text, onclickfun }) => {

    return (
        <a
            key={key}
            href={href}
            className="action-button-transparent"
            onClick={onclickfun ? onclickfun : undefined}
        >
            {text}
        </a>
    );
}

export default ActionButtonTransparent;