import React from 'react';
import './App.css';
import FighterTable from './FighterTable';

class App extends React.Component {
	constructor(props) {
		super(props);
	}
	render(){
		return (
			<div className="App">
				<div className="col">

				</div>
				<div className="col">
					<div className="table">
						<FighterTable/>
					</div>
				</div>
				<button onClick={}>Advance</button>
			</div>
		);
	}
}

export default App;
