import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import registerServiceWorker from './registerServiceWorker';
import foodData from './food-data.json';


ReactDOM.render(<App foodData={foodData[0]} />, document.getElementById('root'));
registerServiceWorker();
