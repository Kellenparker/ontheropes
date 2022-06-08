import _ from "lodash";
import { Match, Result } from "./CardHandler";

function Fight(match: Match): Result {
    var winner;
    let result: Result;
    let finish: number; //0: KO, 1: TKO, 2: RTD, 3: DSQ
    let round: number;

    match.fighterOne.fights++;
    match.fighterTwo.fights++;

    let dif = {
        reach: match.fighterOne.reach - match.fighterTwo.reach,
        height: match.fighterOne.height - match.fighterTwo.height,
        stamina: match.fighterOne.stamina - match.fighterTwo.stamina,
        power: match.fighterOne.power - match.fighterTwo.power,
        chin: match.fighterOne.chin - match.fighterTwo.chin,
        speed: match.fighterOne.speed - match.fighterTwo.speed,
        timing: match.fighterOne.timing - match.fighterTwo.timing,
        defense: match.fighterOne.defense - match.fighterTwo.defense,
        footwork: match.fighterOne.footwork - match.fighterTwo.footwork,
    };

    let fOneKoChance =
        match.fighterOne.power / (100 / 0.3) +
        match.fighterOne.timing / (100 / 0.3) +
        match.fighterOne.stamina / (100 / 0.3) -
        (match.fighterTwo.chin / (100 / 0.3) +
            match.fighterTwo.defense / (100 / 0.3) +
            match.fighterTwo.stamina / (100 / 0.3));

    let fTwoKoChance =
        match.fighterTwo.power / (100 / 0.3) +
        match.fighterTwo.timing / (100 / 0.3) +
        match.fighterTwo.stamina / (100 / 0.3) -
        (match.fighterOne.chin / (100 / 0.3) +
            match.fighterOne.defense / (100 / 0.3) +
            match.fighterOne.stamina / (100 / 0.3));

    let fOneKo = fOneKoChance / 3 > _.random(0, 1, true);
    let fTwoKo = fTwoKoChance / 3 > _.random(0, 1, true);
    if (fOneKo && !fTwoKo) {
        finish = 0;
        round = _.random(1, match.rounds, false);
        winner = 0;
    } else if (!fOneKo && fTwoKo) {
        finish = 0;
        round = _.random(1, match.rounds, false);
        winner = 1;
    } else if (fOneKo && fTwoKo) {
        finish = 0;
        round = _.random(1, match.rounds, false);
        winner = _.random(0, 1, true) > .5 ? 0 : 1;
    } else {
        let physDif = dif.height + dif.reach + dif.stamina + dif.chin + dif.power;
        let skillDif = dif.timing + dif.defense + dif.speed + dif.footwork;
        let sway = 3;

        let trueDif = (physDif / .6)+ skillDif;

        if(trueDif > 0) winner = _.random(0 - (sway / trueDif), trueDif - (sway / trueDif), true) > 0 ? 0 : 1;
        else winner = _.random(trueDif + (sway / trueDif), 0 + (sway / trueDif), true) > 0 ? 1 : 0;

        finish = -1;
        round = -1;
    }

    if (winner === 0) {
        if (match.fighterTwo.belts > 0) {
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

        if (match.fighterOne.streak > 0) match.fighterOne.streak++;
        else match.fighterOne.streak = 1;
        if (match.fighterTwo.streak < 0) match.fighterTwo.streak--;
        else match.fighterTwo.streak = -1;

        match.fighterOne.hasFight = false;
        match.fighterTwo.hasFight = false;

        result = {
            fighterOne: match.fighterOne,
            fighterTwo: match.fighterTwo,
            matchId: {
                fone: match.fighterOne.id,
                ftwo: match.fighterTwo.id,
            },
            weight: match.weight,
            title: match.title,
        };
        match.fighterOne.results.push({
            opponent: {
                name: match.fighterTwo.firstName + " " + match.fighterTwo.lastName,
                id: match.fighterTwo.id,
                overall: match.fighterTwo.overall,
                record: match.fighterTwo.formatted.record,
                belts: match.fighterTwo.belts,
            },
            num: match.fighterOne.fights,
            dateStr: match.dateStr,
            win: true,
            finish: {
                style: finish,
                round: round,
            },
            title: match.title,
        });
        match.fighterTwo.results.push({
            opponent: {
                name: match.fighterOne.firstName + " " + match.fighterOne.lastName,
                id: match.fighterOne.id,
                overall: match.fighterOne.overall,
                record: match.fighterOne.formatted.record,
                belts: match.fighterOne.belts,
            },
            num: match.fighterTwo.fights,
            dateStr: match.dateStr,
            win: false,
            finish: {
                style: finish,
                round: round,
            },
            title: match.title,
        });
    } else {
        if (match.fighterOne.belts > 0) {
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

        if (match.fighterOne.streak < 0) match.fighterOne.streak--;
        else match.fighterOne.streak = -1;
        if (match.fighterTwo.streak > 0) match.fighterTwo.streak++;
        else match.fighterTwo.streak = 1;

        match.fighterOne.hasFight = false;
        match.fighterTwo.hasFight = false;

        result = {
            fighterOne: match.fighterTwo,
            fighterTwo: match.fighterOne,
            matchId: {
                fone: match.fighterTwo.id,
                ftwo: match.fighterOne.id,
            },
            weight: match.weight,
            title: match.title,
        };
        match.fighterOne.results.push({
            opponent: {
                name: match.fighterTwo.firstName + " " + match.fighterTwo.lastName,
                id: match.fighterTwo.id,
                overall: match.fighterTwo.overall,
                record: match.fighterTwo.formatted.record,
                belts: match.fighterTwo.belts,
            },
            num: match.fighterOne.fights,
            dateStr: match.dateStr,
            win: false,
            finish: {
                style: finish,
                round: round,
            },
            title: match.title,
        });
        match.fighterTwo.results.push({
            opponent: {
                name: match.fighterOne.firstName + " " + match.fighterOne.lastName,
                id: match.fighterOne.id,
                overall: match.fighterOne.overall,
                record: match.fighterOne.formatted.record,
                belts: match.fighterOne.belts,
            },
            num: match.fighterTwo.fights,
            dateStr: match.dateStr,
            win: true,
            finish: {
                style: finish,
                round: round,
            },
            title: match.title,
        });
    }

    return result;
}

export default Fight;
