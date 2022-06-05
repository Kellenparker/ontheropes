import localforage from "localforage";
import CardHandler from "./CardHandler";
import FighterHandler, { Fighter } from "./FighterHandler";
import { ImportData, LocalTime } from "./League";
import Time from "./Time";

function getRoster() {
    let roster = new FighterHandler();
    return new Promise(resolve => {
        localforage.getItem('activeFighters').then(function(value) {
            // This code runs once the value has been loaded
            // from the offline store.
            roster = new FighterHandler();
            if(value === null){
                roster.initRoster();
            }else{
                roster.loadFighters(value as Fighter[][]);
                localforage.getItem('retiredFighters').then(function(value) {
                    roster.loadRetired(value as Fighter[]);
                })
            }
            resolve(roster);
        })
    })
}

export async function Load(start: number) {

    let leagueTime;
    let time: Time;
    let roster: FighterHandler;
    let cards: CardHandler;
    let init: boolean = true;

    if(window.localStorage.getItem('leagueTime') === null){
        leagueTime = {
            tick: 0,
            startYear: start,
        };
        window.localStorage.setItem('leagueTime', JSON.stringify(leagueTime));
    }
    else{
        let obj = window.localStorage.getItem('leagueTime') as string;
        leagueTime = JSON.parse(obj);
    }

    time = new Time(leagueTime.startYear, leagueTime.tick);
    
    roster = await getRoster() as FighterHandler;

    if(window.localStorage.getItem('weeks') === null){
        cards = new CardHandler(time, roster);
        window.localStorage.setItem('weeks', JSON.stringify(cards.weeks));
    }
    else{
        init = false;
        let weeks = window.localStorage.getItem('weeks') as string;
        let result = window.localStorage.getItem('result') as string;
        cards = new CardHandler(time, roster, JSON.parse(weeks), JSON.parse(result));
    }

    return {
        leagueTime,
        time,
        roster,
        cards,
        init
    } as unknown as ImportData;

}

export async function Save(leagueTime: LocalTime, roster: FighterHandler, cards: CardHandler) {
    
    window.localStorage.setItem('leagueTime', JSON.stringify(leagueTime));
    localforage.setItem('activeFighters', roster.fighters).then(function(value) {
        console.log(value);
    }).catch(function(err) {
        console.log(err);
    });
    localforage.setItem('retiredFighters', roster.retired).then(function(value) {
        console.log(value);
    }).catch(function(err) {
        console.log(err);
    })
    window.localStorage.setItem('weeks', JSON.stringify(cards.weeks));
    window.localStorage.setItem('result', JSON.stringify(cards.results));

}