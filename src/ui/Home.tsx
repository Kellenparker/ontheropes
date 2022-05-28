import React from "react";
import { Card, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import "./styles/Home.css";
import FighterTable from "./FighterTable";
import { Fighter } from "../handlers/FighterHandler";
import { Week, Result } from "../handlers/CardHandler";
import League from "../handlers/League";
import { Link } from "react-router-dom";

type myProps = {
    league: League;
};
type myState = {
    league: League;
    week: Week[];
    results: Result[];
    roster: Fighter[][];
    weightClass: number;
};

class Home extends React.Component<myProps, myState> {
	select: number;
    constructor(props: myProps | Readonly<myProps>) {
        super(props);
		this.select = 0;
        this.state = {
            league: this.props.league,
            week: this.props.league.getCards(),
            results: this.props.league.getResults(),
            roster: this.props.league.getRoster(),
            weightClass: 0,
        };
    }
    change = (e: SelectChangeEvent) => {
		console.log(e.target.value);
        this.setState({
            weightClass: parseInt(e.target.value),
        });
    };
    getResults = () => {
        this.setState({
            results: this.props.league.getResults()
        });
    }
    render() {
        return (
            <div className="App">
                <div className="col">
                    <p style={{textAlign: "center"}}>Cards This Week</p>
                    <hr className="line"></hr>
                    {this.state.week[0].cards.map((card, i) => (
                        i >= 4 ? <div key={"null" + i}></div> :
                        <Card className={"fightCard"} key={"card" + i}>
                            <Link to={`/f/${card.matches[0].fighterOne.id}`} className="fighter one">{card.matches[0].fighterOne.lastName}</Link>
                            <p className="vs">vs.</p>
                            <Link to={`/f/${card.matches[0].fighterTwo.id}`} className="fighter two">{card.matches[0].fighterTwo.lastName}</Link>
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
                            <Link to={`/f/${result.fighterOne.id}`} className="fighter one">{result.fighterOne.lastName}</Link>
                            <p className="vs">Defeats</p>
                            <Link to={`/f/${result.fighterTwo.id}`} className="fighter two">{result.fighterTwo.lastName}</Link>
                            <p className="fightDesc">{result.title ? "12 Round Title Fight" : "10 Round Main Event"}</p>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }
}

export default Home;