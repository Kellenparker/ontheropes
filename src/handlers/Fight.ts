import _ from "lodash";
import { Match } from "./CardHandler";
import { Fighter } from "./FighterHandler";

function Fight(match: Match){
    
    let dif = (match.fighterOne.overall - match.fighterTwo.overall) / 5;
    var winner;

    if(_.random(-25, 25, true) > dif) winner = 0;
    else winner = 1;

    if(winner === 0){
        if(match.fighterTwo.belts > 0){
            match.fighterOne.belts += match.fighterTwo.belts;
            match.fighterTwo.belts = 0;
        }

        match.fighterOne.damage += _.random(0, 1, true);
        match.fighterTwo.damage += _.random(0, 5, true);

        match.fighterOne.popularity += _.random(0, 5, true);
        match.fighterTwo.popularity += _.random(-5, 1, true);

        match.fighterOne.success += _.random(0, 5, true);
        match.fighterTwo.success += _.random(0, 1, true);

        match.fighterOne.wins += 1;
        match.fighterTwo.losses += 1;

        match.fighterOne.hasFight = false;
        match.fighterTwo.hasFight = false;
    }
    else {
        if(match.fighterOne.belts > 0){
            match.fighterTwo.belts += match.fighterOne.belts;
            match.fighterOne.belts = 0;
        }

        match.fighterOne.damage += _.random(0, 5, true);
        match.fighterTwo.damage += _.random(0, 1, true);

        match.fighterOne.popularity += _.random(-5, 1, true);
        match.fighterTwo.popularity += _.random(0, 5, true);

        match.fighterOne.success += _.random(0, 1, true);
        match.fighterTwo.success += _.random(0, 5, true);

        match.fighterOne.losses += 1;
        match.fighterTwo.wins += 1;

        match.fighterOne.hasFight = false;
        match.fighterTwo.hasFight = false;

    }

}

export default Fight;