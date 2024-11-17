import { Point } from "./Point.js";
import { Rock } from "./Rock.js";

export class Hole extends Point {
    
    private content: Rock | null;

    constructor (x: number, y: number) {
        super(x, y, "black")
        this.content = null;
    }

    public addRock(r: Rock) {
        if (this.isEmpty() && r.hasTouch(this)) {
            this.content = r;
            this.setColor("gray");
            r.hasLocked(this);
        } else {
            console.log('Hole is full !')
        }
    }

    public getContent() {
        return this.content;
    }

    public isEmpty(): boolean {
        if (this.content === null) return true;
        return false;
    }

    public containsRock(rock: Rock): boolean {
        if (this.content === rock) return true;
        return false;
    }
    
    // public addRock(): boolean | undefined {
    //     if (!this.rock) {
    //         this.rock = new Rock(this.x, this.y);
    //         this.setColor('gray');
    //         return true;
    //     }
    //     return false;
    // }
}