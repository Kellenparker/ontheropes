import _ from "lodash";
import React from "react";
import { useParams } from "react-router-dom";
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Fighter } from "../handlers/FighterHandler";
import ResultTable from "./ResultTable";
import "./styles/FighterPage.css";

const getWeightClass = (num: number): string => {
    const weightClasses = [
        "Flyweight",
        "Bantamweight",
        "Featherweight",
        "Lightweight",
        "Welterweight",
        "Middleweight",
        "Light Heavyweight",
        "Cruiserweight",
        "Heavyweight",
    ];
    return weightClasses[num];
};

const FighterPage = (props: { fighters: Fighter[][] }) => {
    const { id } = useParams();
    let fighter: Fighter | undefined;
    let len = props.fighters.length;
    for (let i = 0; i < len && fighter === undefined; i++) fighter = _.find(props.fighters[i], { id: id });

    return (
        <div>
            <h3 className="name">{fighter!.firstName + " " + fighter!.lastName}</h3>
            <div className="fighterPage">
                <div className="col">
                    <p style={{textAlign: "center"}}>Bio</p>
                    <hr className="line"></hr>
                    <TableContainer>
                        <Table sx={{ minWidth: 0 }} aria-label="simple table">
                            <TableHead>
                                <TableRow><TableCell>Belts: {fighter!.belts}</TableCell></TableRow>
                                <TableRow><TableCell>Record: {fighter!.formatted.record}</TableCell></TableRow>
                                <TableRow><TableCell>Age: {fighter!.age}</TableCell></TableRow>
                                <TableRow><TableCell>Weight Class: {getWeightClass(fighter!.weightClass)}</TableCell></TableRow>
                                <TableRow><TableCell>Height: {fighter!.height}</TableCell></TableRow>
                                <TableRow><TableCell>Reach: {fighter!.reach}</TableCell></TableRow>
                            </TableHead>
                        </Table>
                    </TableContainer>
                </div>
                <div className="col">
                    <p style={{textAlign: "center"}}>Stats</p>
                    <hr className="line"></hr>
                    <TableContainer>
                        <Table sx={{ minWidth: 0 }} aria-label="simple table">
                            <TableHead>
                                <TableRow><TableCell>Overall: {Math.round(fighter!.overall)}</TableCell></TableRow>
                                <TableRow><TableCell>Speed: {Math.round(fighter!.speed)}</TableCell></TableRow>
                                <TableRow><TableCell>Power: {Math.round(fighter!.power)}</TableCell></TableRow>
                                <TableRow><TableCell>Footwork: {Math.round(fighter!.footwork)}</TableCell></TableRow>
                                <TableRow><TableCell>Timing: {Math.round(fighter!.timing)}</TableCell></TableRow>
                                <TableRow><TableCell>Defense: {Math.round(fighter!.defense)}</TableCell></TableRow>
                                <TableRow><TableCell>Chin: {Math.round(fighter!.chin)}</TableCell></TableRow>
                                <TableRow><TableCell>Motivation: {Math.round(fighter!.motivation)}</TableCell></TableRow>
                            </TableHead>
                        </Table>
                    </TableContainer>
                </div>
                <div className="col">
                    <p style={{textAlign: "center"}}>Past Results</p>
                    <hr className="line"></hr>
                    <div className="results">
                        <ResultTable fighter={fighter!} hasResults={fighter!.results !== undefined}></ResultTable>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FighterPage;
