import * as React from 'react';
import 'react-tabulator';

import "react-tabulator/lib/styles.css"; // default theme
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css"; // use Theme(s)

import { ReactTabulator, reactFormatter } from "react-tabulator";

function SimpleButton(props: any | null) {
	const rowData = props.cell._cell.row.data;
	const cellValue = props.cell._cell.value || "Edit | Show";
	return <button onClick={() => alert(rowData.name)}>{cellValue}</button>;
}

const data = [
	{
		id: 1,
		name: "Oli Bob",
		age: "12",
		color: "red",
		dob: "01/01/1980",
		rating: 5,
		passed: true,
		pets: ["cat", "dog"]
	},
	{
		id: 2,
		name: "Mary May",
		age: "1",
		color: "green",
		dob: "12/05/1989",
		rating: 4,
		passed: true,
		pets: ["cat"]
	},
	{
		id: 5,
		name: "Margret Marmajuke",
		age: "16",
		color: "yellow",
		dob: "07/01/1999",
		rating: 4,
		passed: false
	},
	{
		id: 6,
		name: "Van Ng",
		age: "37",
		color: "green",
		dob: "06/10/1982",
		rating: 4,
		passed: true,
		pets: ["dog", "fish"]
	},
	{
		id: 7,
		name: "Duc Ng",
		age: "37",
		color: "yellow",
		dob: "10/10/1982",
		rating: 4,
		passed: true,
		pets: ["dog"]
	}
];

class FighterTable extends React.Component {
	state = {
		data: [],
		selectedName: ""
	};
	ref: any | null = null;

	columns = [
		{ title: "Name", field: "name", width: 150 },
		{ title: "Age", field: "age", hozAlign: "left", formatter: "progress" },
		{ title: "Favourite Color", field: "color" },
		{ title: "Date Of Birth", field: "dob" },
		{ title: "Rating", field: "rating", hozAlign: "center", formatter: "star" },
		{
			title: "Passed?",
			field: "passed",
			hozAlign: "center",
			formatter: "tickCross"
		},
		{
			title: "Custom",
			field: "custom",
			hozAlign: "center",
			editor: "input",
			formatter: reactFormatter(
				<SimpleButton
					onSelect={(name: any) => {
						this.setState({ selectedName: name });
						alert(name);
					}}
				/>
			)
		}
	];

	rowClick = (e: any, row: { getData: () => { (): any; new(): any; name: any; }; }) => {
		console.log("ref table: ", this.ref.table); // this is the Tabulator table instance
		console.log(`rowClick id: \${row.getData().id}`, row, e);
		this.setState({ selectedName: row.getData().name });
	};

	setData = () => {
		this.setState({ data });
	};

	clearData = () => {
		this.setState({ data: [] });
	};

	render() {
		const options = {
			height: 450,
			innerWidth: 200,
			debugInvalidOptions: false
			
		};
		return (
			<div>
				<ReactTabulator
					ref={(ref) => (this.ref = ref)}
					columns={this.columns}
					data={data}
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
