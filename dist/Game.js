import { DIRECTION } from "./Direction.js";
import { Display } from "./Display.js";
import { Hole } from "./Hole.js";
import { Player } from "./Player.js";
import { Rock } from "./Rock.js";
export class Game {
    constructor(width, height, scale, level = 1) {
        this.width = width;
        this.height = height;
        this.display = new Display(width, height, scale);
        this.level = level;
        this.player = new Player("José", width / 2, height / 2);
        this.rocks = [new Rock(this.randomizer(), this.randomizer())];
        this.holes = [new Hole(this.randomizer(), this.randomizer())];
    }
    start() {
        this.display.draw(this);
        this.initialize();
    }
    initialize() {
        document.addEventListener("keydown", (event) => {
            let new_dir;
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
                }
                else {
                    console.log("finish");
                    //Bouton recommencer
                }
            }
            else {
                console.log("Press wrong key");
            }
            this.player.endMove();
        });
    }
    playerCollideHole() {
        for (let i = 0; i < this.holes.length; i++) {
            if (this.player.hasTouch(this.holes[i]) && this.holes[i].isEmpty()) {
                return true;
            }
        }
        return false;
    }
    playerCollideRock(r) {
        if (this.player.hasTouch(r))
            return true;
        return false;
    }
    rockCollideHole(r) {
        for (const hole of this.holes) {
            if (r.hasTouch(hole) && hole.isEmpty()) {
                hole.addRock(r);
            }
        }
    }
    pushRock(r, direction) {
        if (!r.getIsLocked()) {
            r.move(direction);
            this.rockCollideHole(r);
        }
        else {
            ("rock is stuck");
        }
    }
    playerCanPush(d) {
        for (const rock of this.rocks) {
            if (this.playerCollideRock(rock))
                this.pushRock(rock, d);
        }
    }
    isWin() {
        let counterHolesFilled = 0;
        for (const hole of this.holes) {
            if (!hole.isEmpty()) {
                counterHolesFilled++;
            }
        }
        if (counterHolesFilled === this.holes.length) {
            this.display.clearDraw();
            this.newLevel();
            return true;
        }
        return false;
    }
    newLevel() {
        this.rocks = [];
        this.holes = [];
        this.level++;
        this.duplicateItemsLevel();
    }
    duplicateItemsLevel() {
        for (let i = 0; i < this.level; i++) {
            this.rocks.push(new Rock(this.randomizer(), this.randomizer()));
            this.holes.push(new Hole(this.randomizer(), this.randomizer()));
            this.player.setX(this.width / 2);
            this.player.setY(this.width / 2);
        }
        this.display.draw(this);
    }
    randomizer() {
        return Math.floor(Math.random() * this.width);
    }
    getDisplay() {
        return this.display;
    }
    getScore() {
        return String(this.level);
    }
    getPlayer() {
        return this.player;
    }
    getRocks() {
        return this.rocks;
    }
    getHoles() {
        return this.holes;
    }
}
