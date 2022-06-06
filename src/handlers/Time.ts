class Time {
    private year: number;
    private week: number;

    constructor(startYear: number, tick: number) {
        this.year = startYear + Math.floor(tick / 52);
        this.week = (tick % 52) + 1;
    }

    advance = () => {
        console.log(this.year);
        this.week++;
        if (this.week > 52) {
            this.week = 1;
            this.year++;
        }
    };

    getDateStr = () => "Week " + this.week + ", " + this.year;

    getFutureDate = (weeks: number) => {
        let futureWeek = this.week + weeks;
        let futureYear = this.year + Math.floor(futureWeek / 52);
        return "Week " + (futureWeek % 52) + ", " + futureYear;
    };
}

export default Time;
