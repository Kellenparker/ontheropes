
interface Time {
    tick: number;
    year: number;
    week: number
};

class League {

    time: Time;

    constructor(start: number) {

        this.time = {
            tick: 0,
            year: start,
            week: 0
        };
        
    }

    advance(amt: number) {
        for(let i = 0; i < amt; i++){
            this.time.tick++;
            this.time.week++;
        }
    }
}

export default League;