import { DIRECTION } from "./Direction.js";
import { Point } from "./Point.js";
export class Rock extends Point {
    constructor(x, y, isLock = false) {
        super(x, y, "brown");
        this.isLocked = isLock;
    }
    move(d) {
        let xRock = this.x;
        let yRock = this.y;
        if (!this.isLocked) {
            switch (d) {
                case DIRECTION.UP:
                    yRock--;
                    break;
                case DIRECTION.DOWN:
                    yRock++;
                    break;
                case DIRECTION.LEFT:
                    xRock--;
                    break;
                case DIRECTION.RIGHT:
                    xRock++;
                    break;
            }
            this.setX(xRock);
            this.setY(yRock);
        }
        else {
            'Cant move';
        }
    }
    hasLocked(h) {
        if (h.containsRock(this)) {
            this.setColor("gray");
            this.isLocked = true;
        }
        else {
            this.isLocked = false;
        }
        return this.isLocked;
    }
    getIsLocked() {
        return this.isLocked;
    }
}
