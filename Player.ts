import { DIRECTION } from "./Direction.js";
import { Point } from "./Point.js";
import { Rock } from "./Rock.js";

export class Player extends Point {
    
    private name: string;
    private hasMove: boolean;

    constructor (name: string, x: number, y: number) {
        super(x, y, "blue")
        this.name = name;
        this.hasMove = false;
    }

    public move(d: DIRECTION): boolean {
        let xPlayer: number = this.getX();
        let yPlayer: number = this.getY();

        switch(d) {
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

   public getHasMove() {
    return this.hasMove;
   }

   public endMove():void{
    this.hasMove = false;
   }
}