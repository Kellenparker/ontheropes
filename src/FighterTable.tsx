import * as React from "react";
import "react-tabulator";
import "./FighterTable.css";
import { Fighter } from "./handlers/FighterHandler";

import "react-tabulator/lib/styles.css"; // default theme
import "react-tabulator/css/tabulator_semanticui.css"; // use Theme(s)

import { ReactTabulator } from "react-tabulator";
/*
function SimpleButton(props: any | null) {
    const rowData = props.cell._cell.row.data;
    const cellValue = props.cell._cell.value || "Edit | Show";
    return <button onClick={() => alert(rowData.name)}>{cellValue}</button>;
}
*/

type myProps = {
	getFighters: Fighter[]
}
type myState = {
	selectedName: string
}

class FighterTable extends React.Component<myProps, myState> {
    

	constructor(props: myProps | Readonly<myProps>){
		super(props);
		this.state = {
			selectedName: ""
		}
	}

    ref: any | null = null;

    columns = [
        { title: "Name", field: "name", formatter: "link" },
        { title: "Age", field: "age" },
        { title: "Overall", field: "overall", sorter: "number" },
        { title: "wins", field: "wins", sorter: "number" },
        { title: "losses", field: "losses", sorter: "number" },
        { title: "draws", field: "draws", sorter: "number" },
        { title: "fights", field: "fights", sorter: "number" },
        { title: "Footwork", field: "footwork", sorter: "number" }
    ];
	
    rowClick = (
        e: any,
        row: { getData: () => { (): any; new (): any; name: any } }
    ) => {
        console.log("ref table: ", this.ref.table); // this is the Tabulator table instance
        console.log(`rowClick id: \${row.getData().id}`, row, e);
        this.setState({ selectedName: row.getData().name });
		console.log(row.getData());
    };

    render() {
        const options = {
            maxHeight: "100%",
			initialSort: [
				{column: "overall", dir: "desc"}
			],
			persistence: {
				sort: true,
				filter: true,
			},
            virtualDOMBuffer: true,
            debugInvalidOptions: false
		}
        return (
            <div className="holder">
                <ReactTabulator
                    ref={(ref) => (this.ref = ref)}
                    columns={this.columns}
                    data={this.props.getFighters}
                    rowClick={this.rowClick}
                    options={options}
                    data-custom-attr="test-custom-attribute"
                    className="custom-css-class"
                />
            </div>
        );
    }
}

export default FighterTable;
