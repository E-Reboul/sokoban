import Drawer from "./Drawer.js";
export class Display {
    constructor(width, height, scale = 10) {
        this.drawer = new Drawer(width, height, scale);
    }
    refreshScore(game) {
        let score = document.getElementById("score");
        if (score != null)
            score.innerHTML = game.getScore();
    }
    clearDraw() {
        this.drawer.clear();
    }
    draw(game) {
        this.drawer.clear();
        const player = game.getPlayer();
        this.refreshScore(game);
        for (let j = 0; j < game.getHoles().length; j++) {
            let indexHole = game.getHoles()[j];
            this.drawer.drawCircle(indexHole.getX(), indexHole.getY(), indexHole.getColor());
        }
        for (let i = 0; i < game.getRocks().length; i++) {
            let indexRock = game.getRocks()[i];
            this.drawer.drawCircle(indexRock.getX(), indexRock.getY(), indexRock.getColor());
        }
        this.drawer.drawRectangle(player.getX(), player.getY(), player.getColor());
    }
}
