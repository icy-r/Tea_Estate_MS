const ActionButtonTransparent = ({ key, href, text }) => {
    return (
        <a
            key={key}
            href={href}
            className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
        >
            {text}
        </a>
    );
}

export default ActionButtonTransparent;