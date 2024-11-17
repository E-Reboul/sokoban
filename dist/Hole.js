import { Point } from "./Point.js";
export class Hole extends Point {
    constructor(x, y) {
        super(x, y, "black");
        this.content = null;
    }
    addRock(r) {
        if (this.isEmpty() && r.hasTouch(this)) {
            this.content = r;
            this.setColor("gray");
            r.hasLocked(this);
        }
        else {
            console.log('Hole is full !');
        }
    }
    getContent() {
        return this.content;
    }
    isEmpty() {
        if (this.content === null)
            return true;
        return false;
    }
    containsRock(rock) {
        if (this.content === rock)
            return true;
        return false;
    }
}
