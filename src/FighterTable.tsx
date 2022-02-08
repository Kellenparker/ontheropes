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
    getFighters: Fighter[];
};
type myState = {
    selectedName: string;
};

class FighterTable extends React.Component<myProps, myState> {
    constructor(props: myProps | Readonly<myProps>) {
        super(props);
        this.state = {
            selectedName: "",
        };
    }

    ref: any | null = null;

    columns = [
        {
            title: "Name",
            field: "name"},
        { title: "Age", field: "age" },
        { title: "Overall", field: "formatted.overall", sorter: "number",
        formatter: function (cell: any, formatterParams: any) {
            var cellValue = cell.getValue();
            if (cellValue.includes("+")) {
                cell.getElement().style.color = "green";
            } else if (cellValue.includes("-")){
                cell.getElement().style.color = "red";
            } else {
                cell.getElement().style.color = "black";
            }
            return cellValue;
        }},
        { title: "Record", field: "formatted.record", sorter: "number" },
        { title: "Streak", field: "formatted.streak", sorter: "number" }
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
            initialSort: [{ column: "formatted.overall", dir: "desc" }],
            persistence: {
                sort: true,
                filter: true,
            },
            debugInvalidOptions: false,
        };
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
