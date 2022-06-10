import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Header.css'

const Header = () => {
	return (
		<div className="header">
			<Link to="/" className="title">On the Ropes</Link>
			<div>
				<button className="headButton">Champions</button>
				<button className="headButton">Top Fighters</button>
				<button className="headButton">Upcoming Cards</button>
				<button className="headButton">Hall of Fame</button>
			</div>
		</div>
	);
}

export default Header;

