import React from "react";

const Preview = ({ file }) => {
  return (
    <div className="preview">
      <h2 className="preview__title">{file.name}</h2>
      <hr />
      {file.type === "image" && (
        <img className="preview__image" src={file.image} alt={file.name} />
      )}

      {file.type === "text" && (
        <pre
          className="preview__text" 
          dangerouslySetInnerHTML={{ __html: file.content }}
        ></pre>
      )}
      {file.type === "audio" && (
        <audio className="preview__audio" controls>
          <source src={file.audio} type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
};

export default Preview;


