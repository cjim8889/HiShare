import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { initializeIcons } from '@uifabric/icons';
// import { loadRecaptchaScript } from './components/Recaptcha';

// loadRecaptchaScript("6LfR5qQUAAAAAGgrVEcyHL1ED4RRsDL6awSSy8fr");
initializeIcons();
ReactDOM.render(<App />, document.getElementById('root'));


serviceWorker.register();
