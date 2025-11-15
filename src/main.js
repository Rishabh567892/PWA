
// main.js

import './style.css'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js', {type: 'module'});
    console.log("service-worker loaded")
  });
}
