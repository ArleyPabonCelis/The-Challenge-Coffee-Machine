import React from 'react';

function Validations({ message, classMg }) {
    return (
      <>
        <div className={`messages ${classMg}`}>
          <p>{message}</p>
        </div>
      </>
    );
  }

export default Validations;