import { DIRECTION } from "./Direction.js";
import { Point } from "./Point.js";
export class Player extends Point {
    constructor(name, x, y) {
        super(x, y, "blue");
        this.name = name;
        this.hasMove = false;
    }
    move(d) {
        let xPlayer = this.getX();
        let yPlayer = this.getY();
        switch (d) {
            case DIRECTION.UP:
                yPlayer--;
                break;
            case DIRECTION.DOWN:
                yPlayer++;
                break;
            case DIRECTION.LEFT:
                xPlayer--;
                break;
            case DIRECTION.RIGHT:
                xPlayer++;
                break;
        }
        this.hasMove = true;
        this.setX(xPlayer);
        this.setY(yPlayer);
        return this.hasMove;
    }
    getHasMove() {
        return this.hasMove;
    }
    endMove() {
        this.hasMove = false;
    }
}
