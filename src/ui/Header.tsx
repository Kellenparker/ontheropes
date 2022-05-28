import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Header.css'

const Header = () => {
	return (
		<div className="header">
			<Link to="/" className="title">On the Ropes</Link>
			<div>
				<button className="headButton">Test</button>
				<button className="headButton">Test2</button>
				<button className="headButton">Test3</button>
				<button className="headButton">Test4</button>
			</div>
		</div>
	);
}

export default Header;

