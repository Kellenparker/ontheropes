import React from "react";
import Button from "@mui/material/Button";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import "./App.css";
import FighterTable from "./FighterTable";
import { Fighter } from "../handlers/FighterHandler";
import League from "../handlers/LeagueHandler";

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
	select: number;
    constructor(props: myProps | Readonly<myProps>) {
        super(props);
		this.select = 0;
        this.state = {
            league: this.props.league,
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
        });
    };
    render() {
        return (
            <div className="App">
                <div className="col"></div>
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
                <p id="dayStr">{this.state.date}</p>
                <Button
                    id="advBtn"
                    variant="contained"
                    onClick={(e) => this.advance(52)}
                >
                    Advance
                </Button>
            </div>
        );
    }
}

export default App;
