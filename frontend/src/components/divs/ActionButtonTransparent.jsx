import "./ActionButtonColor.css"

// eslint-disable-next-line react/prop-types
const ActionButtonTransparent = ({ index, href, text, onclickfun }) => {

    return (
        <a
            key={index}
            href={href}
            className="action-button-transparent dark:text-white text-black"
            onClick={onclickfun ? onclickfun : undefined}
        >
            {text}
        </a>
    );
}

export default ActionButtonTransparent;