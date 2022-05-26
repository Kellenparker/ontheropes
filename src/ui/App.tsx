import React from "react";
import Button from "@mui/material/Button";
import { Card, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import "./App.css";
import FighterTable from "./FighterTable";
import { Fighter } from "../handlers/FighterHandler";
import { Week, Result } from "../handlers/CardHandler";
import League from "../handlers/League";

type myProps = {
    league: League;
};
type myState = {
    league: League;
    date: string;
    week: Week[];
    results: Result[];
    roster: Fighter[][];
    weightClass: number;
};

class App extends React.Component<myProps, myState> {
	select: number;
    constructor(props: myProps | Readonly<myProps>) {
        super(props);
		this.select = 0;
        this.state = {
            league: this.props.league,
            week: this.props.league.getCards(),
            results: this.props.league.getResults(),
            date: this.props.league.getDateStr(),
            roster: this.props.league.getRoster(),
            weightClass: 0,
        };
        this.advance = this.advance.bind(this);
    }
    change = (e: SelectChangeEvent) => {
		console.log(e.target.value);
        this.setState({
            weightClass: parseInt(e.target.value),
        });
    };
    advance = (n: number) => {
        this.state.league.advance(n);
        this.setState({
            date: this.state.league.getDateStr(),
            results: this.state.league.getResults()
        });
    };
    render() {
        return (
            <div className="App">
                <div className="col">
                    <p style={{textAlign: "center"}}>Cards This Week</p>
                    <hr className="line"></hr>
                    {this.state.week[0].cards.map((card, i) => (
                        i >= 4 ? <div key={"null" + i}></div> :
                        <Card className={"fightCard"} key={"card" + i}>
                            <p className="fighter one">{card.matches[0].fighterOne.lastName}</p>
                            <p className="vs">vs.</p>
                            <p className="fighter two">{card.matches[0].fighterTwo.lastName}</p>
                            <p className="fightDesc">{card.matches[0].title ? "12 Round Title Fight" : "10 Round Main Event"}</p>
                        </Card>
                    ))}
                </div>
                <div className="col">
				<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} className="weightSel">
					<InputLabel id="demo-simple-select-label">Weight Class</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
                            value={this.state.weightClass.toString()}
                            onChange={this.change}
                            label="Age"
                        >
                            <MenuItem value={0}>Flyweight</MenuItem>
							<MenuItem value={1}>Bantamweight</MenuItem>
							<MenuItem value={2}>Featherweight</MenuItem>
							<MenuItem value={3}>Lightweight</MenuItem>
							<MenuItem value={4}>Welterweight</MenuItem>
							<MenuItem value={5}>Middleweight</MenuItem>
							<MenuItem value={6}>Light Heavyweight</MenuItem>
							<MenuItem value={7}>Cruiserweight</MenuItem>
							<MenuItem value={8}>Heavyweight</MenuItem>
                        </Select>
                    </FormControl>
                    <div className="table">
                        <FighterTable
                            fighters={
                                this.state.roster[this.state.weightClass]
                            }
                        />
                    </div>
                </div>
                <div className="col">
                    <p style={{textAlign: "center"}}>Last Week's Results</p>
                    <hr className="line"></hr>
                    {this.state.results.map((result, i) => (
                        i >= 4 ? <div key={"null" + i}></div> :
                        <Card className={"resultCard"} key={"result" + i}>
                            <p className="fighter one">{result.fighterOne.lastName}</p>
                            <p className="vs">Defeats</p>
                            <p className="fighter two">{result.fighterTwo.lastName}</p>
                            <p className="fightDesc">{result.title ? "12 Round Title Fight" : "10 Round Main Event"}</p>
                        </Card>
                    ))}
                </div>
                <p id="dayStr">{this.state.date}</p>
                <Button
                    id="advBtn"
                    variant="contained"
                    onClick={(e) => this.advance(1)}
                >
                    Advance
                </Button>
            </div>
        );
    }
}

export default App;
