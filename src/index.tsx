import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './ui/App';
import League from './handlers/League';
import reportWebVitals from './reportWebVitals';
import {Load} from './handlers/Storage';

async function init(){

	let data = await Load(2022);

	const league = new League(data);

	ReactDOM.render(
		<React.StrictMode>
			<App league={league} />
		</React.StrictMode>,
		document.getElementById('site-content')
	);

}

init();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
