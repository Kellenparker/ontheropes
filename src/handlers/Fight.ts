import _ from "lodash";
import { Match, Result } from "./CardHandler";

function Fight(match: Match): Result{
    
    let dif = (match.fighterOne.overall - match.fighterTwo.overall) / 5;
    var winner;
    let result: Result;

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

        if(match.fighterOne.streak > 0) match.fighterOne.streak++;
        else match.fighterOne.streak = 1;
        if(match.fighterTwo.streak < 0) match.fighterTwo.streak--;
        else match.fighterTwo.streak = -1;

        match.fighterOne.hasFight = false;
        match.fighterTwo.hasFight = false;

        result = {
            fighterOne: match.fighterOne,
            fighterTwo: match.fighterTwo,
            matchId: {
                fone: match.fighterOne.id,
                ftwo: match.fighterTwo.id
            },
            weight: match.weight,
            title: match.title
        }
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

        if(match.fighterOne.streak < 0) match.fighterOne.streak--;
        else match.fighterOne.streak = -1;
        if(match.fighterTwo.streak > 0) match.fighterTwo.streak++;
        else match.fighterTwo.streak = 1;

        match.fighterOne.hasFight = false;
        match.fighterTwo.hasFight = false;

        result = {
            fighterOne: match.fighterTwo,
            fighterTwo: match.fighterOne,
            matchId: {
                fone: match.fighterTwo.id,
                ftwo: match.fighterOne.id
            },
            weight: match.weight,
            title: match.title
        }
    }

    return result;

}

export default Fight;