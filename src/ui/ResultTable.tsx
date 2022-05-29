import * as React from "react";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import clsx from "clsx";
import { Fighter } from "../handlers/FighterHandler";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

const columns: GridColDef[] = [
    { 
        field: "opponent", 
        headerName: "Name", 
        minWidth: 100, 
        editable: false, 
        flex: 1,
        renderCell: (params) => (
            <Link to={{
                pathname: `/f/${params.id}`
            }}>{params.value}</Link>
        )
    },
    {
        field: "overall",
        headerName: "Overall",
        type: "string",
        minWidth: 50,
        align: "right",
        editable: false,
        flex: 1,
    },
    {
        field: "win",
        headerName: "Win",
        minWidth: 50,
        align: "right",
        editable: false,
        flex: 1,
        cellClassName: (params: GridCellParams<string>) =>
            clsx("super-app", {
                negative: !params.value,
                positive: params.value,
            }),
    },
    {
        field: "record",
        headerName: "Record",
        minWidth: 50,
        align: "right",
        editable: false,
        flex: 1,
    },
    {
        field: "finish",
        headerName: "Finish",
        minWidth: 50,
        align: "right",
        editable: false,
        flex: 1,
    },
    {
        field: "title",
        headerName: "Title",
        minWidth: 50,
        align: "right",
        editable: false,
        flex: 1,
    },
];

interface Data {
    id: string;
    opponent: string;
    overall: number;
    win: boolean;
    record: string;
    finish: number | undefined;
    title: boolean;
}

interface propData {
    fighter: Fighter;
    hasResults: boolean;
}

export default function StickyHeadTable(props: propData) {
    if(props.hasResults){
        const numResults = props.fighter.results.length;
        let formatted = new Array<Data>(numResults);
        for (let i = 0; i < numResults; i++) {
            formatted[i] = {
                id: props.fighter.results[i].opponent.id,
                opponent: props.fighter.results[i].opponent.name,
                overall: props.fighter.results[i].opponent.overall,
                record: props.fighter.results[i].opponent.record,
                win: props.fighter.results[i].win,
                finish: 0,
                title: props.fighter.results[i].title,
            };
        }

        const rows = formatted;

        return (
            <Box
                sx={{
                    marginTop: 2.5,
                    height: 500,
                    width: 1,
                    "& .super-app-theme--cell": {
                        backgroundColor: "rgba(224, 183, 60, 0.55)",
                        color: "#1a3e72",
                    },
                    "& .super-app.positive": {
                        backgroundColor: "#d4ffd9",
                    },
                    "& .super-app.negative": {
                        backgroundColor: "#ffd4d4",
                    },
                }}
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={numResults}
                    rowsPerPageOptions={[]}
                    rowHeight={35}
                    initialState={{
                        sorting: {
                            sortModel: [{ field: "overall", sort: "desc" }],
                        },
                    }}
                    disableSelectionOnClick
                    disableColumnSelector
                    disableColumnMenu
                    hideFooter
                />
            </Box>
        );
    }else{
        return (<div></div>)
    }
}
