import Drawer from "./Drawer.js";
import { Game } from "./Game.js";
import { Hole } from "./Hole.js";
import { Rock } from "./Rock.js";

export class Display{
    private drawer : Drawer;
  
    constructor(width:number, height:number, scale:number = 10) {
        this.drawer = new Drawer(width,height,scale)
    }
  
    public refreshScore(game: Game){
        let score : HTMLElement|null = document.getElementById("score");
        if(score!=null) score.innerHTML = game.getScore();
    }

    public clearDraw() {
        this.drawer.clear();
    }
  
    public draw(game:Game):void {
        this.drawer.clear()
        const player = game.getPlayer();

        this.refreshScore(game);

        for (let j = 0; j < game.getHoles().length; j++) {
            let indexHole: Hole = game.getHoles()[j];

            this.drawer.drawCircle(indexHole.getX(), indexHole.getY(), indexHole.getColor());
        }
        
        for (let i = 0; i < game.getRocks().length; i++) {
            let indexRock: Rock = game.getRocks()[i];

            this.drawer.drawCircle(indexRock.getX(), indexRock.getY(), indexRock.getColor());         
        }

        this.drawer.drawRectangle(player.getX(), player.getY(), player.getColor());
    }        
}