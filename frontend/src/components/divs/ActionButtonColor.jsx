import "./ActionButtonColor.css";


// Key - just some data to identify. acts as a primary ID
// href - the link to redirect to
// text - the text to display on the button
const ActionButtonColor = ({index, href, text, onclickfun, color}) => {
    return (
        <a
            key={index}
            href={href}
            // style={styles.button}
            className={`action-button-color ${color}`}
            onClick={onclickfun ? onclickfun : undefined}
        >
            {text}
        </a>
    );
}

export default ActionButtonColor;