import React from "react";

const LinkList = ({ links }) => {
  if (!links || links.length === 0) {
    return <p>No PYQs uploaded yet for this semester.</p>;
  }

  return (
    <div className="container">
      <h2>Available PYQ Links</h2>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.title || `PYQ ${index + 1}`}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LinkList;
