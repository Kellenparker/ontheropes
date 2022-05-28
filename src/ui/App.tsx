import React, { RefObject } from "react";
import Button from "@mui/material/Button";
import "./styles/App.css";
import League from "../handlers/League";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";

type myProps = {
    league: League;
};
type myState = {
    league: League;
    date: string;
};

class App extends React.Component<myProps, myState> {
    homeRef: RefObject<Home> = React.createRef();

    constructor(props: myProps | Readonly<myProps>) {
        super(props);
        this.state = {
            league: this.props.league,
            date: this.props.league.getDateStr()
        };
        this.advance = this.advance.bind(this);
    }

    advance = (n: number) => {
        this.state.league.advance(n);
        this.setState({
            date: this.state.league.getDateStr()
        });
        this.homeRef.current!.getResults();
    };

    render() {
        return (
            <div>
                <Header/>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home league={this.state.league} ref={this.homeRef as RefObject<Home>}/>}/>
                        <Route path="/home" element={<Home league={this.state.league} ref={this.homeRef as RefObject<Home>}/>}/>
                    </Routes>
                </BrowserRouter>
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