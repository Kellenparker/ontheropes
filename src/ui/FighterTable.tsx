import * as React from "react";
import { DataGrid, GridCellParams, GridColDef, GridComparatorFn } from "@mui/x-data-grid";
import clsx from 'clsx';
import { Fighter } from "../handlers/FighterHandler";
import { Box } from "@mui/system";

const ovrComp: GridComparatorFn = (v1, v2) => {
    return parseInt((v1 as string).substring(0, (v1 as string).indexOf(' ') > 0 ? (v1 as string).indexOf(' ') : (v1 as string).length)) - 
           parseInt((v2 as string).substring(0, (v2 as string).indexOf(' ') > 0 ? (v2 as string).indexOf(' ') : (v2 as string).length))
};

const columns: GridColDef[] = [
    { field: "name", headerName: "Name", minWidth: 100, editable: false, flex: 1  },
    { field: "age", headerName: "Age", minWidth: 25, editable: false, flex: 1  },
    {
        field: "overall",
        headerName: "Overall",
        type: "string",
        sortComparator: ovrComp,
        minWidth: 50,
        align: "right",
        editable: false,
        flex: 1,
        cellClassName: (params: GridCellParams<string>) =>
            clsx('super-app', {
                negative: params.value.includes("-"),
                positive: params.value.includes("+"),
            }),
    },
    {
        field: "record",
        headerName: "Record",
        minWidth: 70,
        align: "right",
        editable: false,
        flex: 1,
    },
    {
        field: "streak",
        headerName: "Streak",
        minWidth: 50,
        align: "right",
        editable: false,
        flex: 1,
    },
];

interface Data {
    id: number;
    name: string;
    age: number;
    overall: string;
    record: string;
    streak: string;
}

interface propData {
    fighters: Fighter[];
}

export default function StickyHeadTable(props: propData) {

    const numFighters = props.fighters.length;
    let formatted = new Array<Data>(numFighters);
    for (let i = 0; i < numFighters; i++) {
        formatted[i] = {
            id: i,
            name: props.fighters[i].name,
            age: props.fighters[i].age,
            overall: props.fighters[i].formatted.overall,
            record: props.fighters[i].formatted.record,
            streak: props.fighters[i].formatted.streak,
        };
    }

    const rows = formatted;

    return (
        <Box sx={{
            marginTop: 2.5,
            height: 450,
            width: 1,
            '& .super-app-theme--cell': {
              backgroundColor: 'rgba(224, 183, 60, 0.55)',
              color: '#1a3e72',
            },
            '& .super-app.positive': {
              backgroundColor: 'rgba(157, 255, 118, 0.49)',
            },
            '& .super-app.negative': {
              backgroundColor: '#d47483',
            },
          }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={numFighters}
                rowsPerPageOptions={[]}
                rowHeight={35}
                initialState={{
                    sorting: {
                        sortModel: [{ field: 'overall', sort: 'desc' }],
                    },
                }}
                disableSelectionOnClick
                disableColumnSelector
                disableColumnMenu
                hideFooter
            />
        </Box>
    );
}
