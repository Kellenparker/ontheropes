import React from "react";
import "./App.css";
import FighterTable from "./FighterTable";

type myProps = {
    advance: Function;
    day: Function;
};
type myState = {
    dayStr: string;
};

class App extends React.Component<myProps, myState> {
    constructor(props: myProps | Readonly<myProps>) {
        super(props);
        this.state = {
            dayStr: this.props.day(),
        };
    }
    advance = () => {
        this.props.advance(1);
        this.state = {
            dayStr: this.props.day(),
        };
        this.setState(this.state);
    };
    getDayStr = () => this.props.day();
    render() {
        return (
            <div className="App">
                <div className="col"></div>
                <div className="col">
                    <div className="table">
                        <FighterTable />
                    </div>
                </div>
                <p id="dayStr">{this.state.dayStr}</p>
                <button id="advBtn" onClick={this.advance}>
                    Advance
                </button>
            </div>
        );
    }
}

export default App;
