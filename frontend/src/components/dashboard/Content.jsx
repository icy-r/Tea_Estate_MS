import React from 'react';

const Content = ({ children }) => {
    return (
        <div className="flex-1 p-8">
            {children}
        </div>
    );
};

export default Content;