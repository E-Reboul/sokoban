import { DIRECTION } from "./Direction.js";
import { Hole } from "./Hole.js";
import { Player } from "./Player";
import { Point } from "./Point.js";

export class Rock extends Point {
  private isLocked: boolean;

  constructor(x: number, y: number, isLock: boolean = false) {
    super(x, y, "brown");
    this.isLocked = isLock;
  }

  public move(d: DIRECTION) {
      let xRock: number = this.x;
      let yRock: number = this.y;

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
    } else {
        'Cant move'
    }
  }

  public hasLocked(h: Hole): boolean {
    if (h.containsRock(this)) {
      this.setColor("gray");
      this.isLocked = true;
    } else {
      this.isLocked = false;
    }
    return this.isLocked;
  }

  public getIsLocked() {
    return this.isLocked;
  }
}
