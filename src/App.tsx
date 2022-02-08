import React from "react";
import "./App.css";
import FighterTable from "./FighterTable";
import { Fighter } from "./handlers/FighterHandler";
import League from "./handlers/LeagueHandler";

type myProps = {
	league: League;
};
type myState = {
	league: League;
	date: string;
	roster: Fighter[][];
	weightClass: number;
};

class App extends React.Component<myProps, myState> {
    constructor(props: myProps | Readonly<myProps>) {
        super(props);
		this.state = {
			league: this.props.league,
			date: this.props.league.getDateStr(),
			roster: this.props.league.getRoster(),
			weightClass: 0
		};
		this.advance = this.advance.bind(this);
    }
	change = (e: React.ChangeEvent<HTMLSelectElement>) => {
		this.setState ({
			weightClass: parseInt(e.target.value)
		});
	}
	advance = (n: number) => {
		this.state.league.advance(n);
		this.setState({
			date: this.state.league.getDateStr()
		});
	}
    render() {
        return (
            <div className="App">
                <div className="col"></div>
                <div className="col">
				<select className="weightSel" onChange={(e) => this.change(e)}>
					<option value={0}>Flyweight</option>
					<option value={1}>Bantamweight</option>
					<option value={2}>Featherweight</option>
					<option value={3}>Lightweight</option>
					<option value={4}>Welterweight</option>
					<option value={5}>Middleweight</option>
					<option value={6}>Light Heavyweight</option>
					<option value={7}>Cruiserweight</option>
					<option value={8}>Heavyweight</option>
				</select>
                    <div className="table">
                        <FighterTable getFighters={this.state.roster[this.state.weightClass]} />
                    </div>
                </div>
                <p id="dayStr">{this.state.date}</p>
                <button id="advBtn" onClick={(e) => this.advance(1)}>
                    Advance
                </button>
            </div>
        );
    }
}

export default App;
