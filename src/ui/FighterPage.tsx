import _ from "lodash";
import React from "react";
import { useParams } from "react-router-dom";
import { Fighter } from "../handlers/FighterHandler";
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
                    <div className="bios">
                        <p className="bio">Belts: {fighter!.belts}</p>
                        <p className="bio">Record: {fighter!.formatted.record}</p>
                        <p className="bio">Age: {fighter!.age}</p>
                        <p className="bio">Weight Class: {getWeightClass(fighter!.weightClass)}</p>
                        <p className="bio">Height: {fighter!.height}</p>
                        <p className="bio">Reach: {fighter!.reach}</p>
                    </div>
                </div>
                <div className="col">
                    <div className="stats">
                        <p className="stat">Overall: {Math.round(fighter!.overall)}</p>
                        <p className="stat">Speed: {Math.round(fighter!.speed)}</p>
                        <p className="stat">Power: {Math.round(fighter!.power)}</p>
                        <p className="stat">Footwork: {Math.round(fighter!.footwork)}</p>
                        <p className="stat">Timing: {Math.round(fighter!.timing)}</p>
                        <p className="stat">Defense: {Math.round(fighter!.defense)}</p>
                        <p className="stat">Chin: {Math.round(fighter!.chin)}</p>
                        <p className="stat">Motivation: {Math.round(fighter!.motivation)}</p>
                    </div>
                </div>
                <div className="col">
                    <div className="results">
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FighterPage;
