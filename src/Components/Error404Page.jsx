import React, { useContext,useState } from 'react';
import { Link } from 'react-router-dom';
import { Authentication } from '../App';
function Error404() {
  const {role} = useContext(Authentication);

  // const [path,setPath] = useState(role === "designer"?"/DesignersHome":role==="customer"?"/Home":"/")
  return (
    <div className="error-container">
      <h1 className="error-code">404</h1>
      <h2 className="error-title">Page Not Found</h2>
      <p className="error-text">Sorry, the page you are looking for doesn't exist.</p>
      <Link to="/" className="error-button">Go Home</Link>
    </div>
  );
}

export default Error404;
