import _ from "lodash";
import React from "react";
import { useParams } from "react-router-dom";
import { Fighter } from "../handlers/FighterHandler";
import "./styles/FighterPage.css";

const FighterPage = (props: { fighters: Fighter[][] }) => {
    const {id} = useParams();
    let fighter: Fighter | undefined;
    let len = props.fighters.length;
    for(let i = 0; i < len && fighter === undefined; i++)
        fighter = _.find(props.fighters[i], {id: id});

    return(
        <div>
            <h3 className="name">{fighter!.firstName + " " + fighter!.lastName}</h3>
        </div>
    )
}

export default FighterPage;