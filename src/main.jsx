/* 
  main.jsx
  I think this is where we 'load' or 'mount' the app -- this should be modifying
  the placeholder 'root' in index.html. 
*/

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import './index.css' import this when we actually have CSS (double check if it's inline css for TW)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);