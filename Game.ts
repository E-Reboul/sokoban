import { DIRECTION } from "./Direction.js";
import { Display } from "./Display.js";
import { Hole } from "./Hole.js";
import { Player } from "./Player.js";
import { Rock } from "./Rock.js";

export class Game {
  private width: number;
  private height: number;
  private display: Display;
  private level: number;
  private player: Player;
  private rocks: Rock[];
  private holes: Hole[];

  constructor(width: number, height: number, scale: number, level: number = 1) {
    this.width = width;
    this.height = height;
    this.display = new Display(width, height, scale);
    this.level = level;
    this.player = new Player("José", width / 2, height / 2);
    this.rocks = [new Rock(this.randomizer(), this.randomizer())];
    this.holes = [new Hole(this.randomizer(), this.randomizer())];
  }

  public start() {
    this.display.draw(this);
    this.initialize();
  }

  public initialize(): void {
    document.addEventListener("keydown", (event) => {
      let new_dir: DIRECTION | null;
      switch (event.key) {
        case "ArrowUp":
          new_dir = DIRECTION.UP;
          break;
        case "ArrowDown":
          new_dir = DIRECTION.DOWN;
          break;
        case "ArrowLeft":
          new_dir = DIRECTION.LEFT;
          break;
        case "ArrowRight":
          new_dir = DIRECTION.RIGHT;
          break;
        default:
          new_dir = null;
      }
      if (new_dir != null) {
        if (!this.playerCollideHole()) {
          this.player.move(new_dir);
          this.playerCanPush(new_dir);
          this.isWin();
          this.display.draw(this);
        } else {
          console.log("finish");
          //Bouton recommencer
        }
      } else {
        console.log("Press wrong key");
      }
      this.player.endMove();
    });
  }

  public playerCollideHole(): boolean {
    for (let i = 0; i < this.holes.length; i++) {
      if (this.player.hasTouch(this.holes[i]) && this.holes[i].isEmpty()) {
        return true;
      }
    }
    return false;
  }

  public playerCollideRock(r: Rock): boolean {
    if (this.player.hasTouch(r)) return true;
    return false;
  }

  public rockCollideHole(r: Rock){
    for (const hole of this.holes) {
      if (r.hasTouch(hole) && hole.isEmpty()) {
        hole.addRock(r);           
      }
    }
  }

  public pushRock(r: Rock, direction: DIRECTION): void {
        if (!r.getIsLocked()) {
          r.move(direction);
          this.rockCollideHole(r);
        } else {
          ("rock is stuck");
        }
  }

  public playerCanPush(d: DIRECTION): void {
    for (const rock of this.rocks) {
      if (this.playerCollideRock(rock)) this.pushRock(rock, d);
    }
  }

  public isWin(): boolean {
    let counterHolesFilled = 0;
    for (const hole of this.holes) {
      if (!hole.isEmpty()) {
        counterHolesFilled++
      }
    }
    if (counterHolesFilled === this.holes.length) {
      this.display.clearDraw();
      this.newLevel();
      return true;
    }
    return false;
  }

  public newLevel(): void {
    this.rocks = [];
    this.holes = [];
    this.level++
    this.duplicateItemsLevel();
  }

  public duplicateItemsLevel(): void {
    for (let i = 0; i < this.level; i++) {
      this.rocks.push(new Rock(this.randomizer(), this.randomizer()));
      this.holes.push(new Hole(this.randomizer(), this.randomizer()));
      this.player.setX(this.width/2);
      this.player.setY(this.width/2);
    }
    this.display.draw(this);
  }

  public randomizer(): number {
    return Math.floor(Math.random() * this.width);
  }

  public getDisplay(): Display {
    return this.display;
  }

  public getScore(): string {
    return String(this.level);
  }

  public getPlayer(): Player {
    return this.player;
  }

  public getRocks(): Rock[] {
    return this.rocks;
  }

  public getHoles(): Hole[] {
    return this.holes;
  }
}
