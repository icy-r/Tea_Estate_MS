import React from 'react';

const Content = ({ children }) => {
    return (
      <div
        className="flex-1 p-1 h-full overflow-y-auto no-scrollbar
    "
      >
        {children}
      </div>
    );
};

export default Content;