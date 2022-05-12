import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './ui/Header';
import App from './ui/App';
import League from './handlers/League';
import reportWebVitals from './reportWebVitals';

const league = new League(2022);

ReactDOM.render(
	<React.StrictMode>
		<Header />
	</React.StrictMode>,
	document.getElementById('head-container')
);

ReactDOM.render(
	<React.StrictMode>
		<App league={league} />
	</React.StrictMode>,
	document.getElementById('site-content')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
