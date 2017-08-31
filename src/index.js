import React from 'react';
import ReactDOM from 'react-dom';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material';
import './index.css';
import App from './App';
import registerServiceWorker from './serviceWorkerDev';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
