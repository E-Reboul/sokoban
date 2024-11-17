export class Point {
    protected x: number;
    protected y: number;
    protected color: string;

    constructor (x: number, y: number, color: string = '') {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    public hasTouch(p: Point): boolean {
        let x: number = this.x;
        let y: number = this.y;

        if (x === p.x && y === p.y) return true;
        return false;
    }

    public isEmptyPos(): boolean {
        if (!this.hasTouch(this)) return true;
        return false;
    }

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }

    getColor(): string {
        return this.color;
    }

    setX(x: number) {
        this.x = x;
    }

    setY(y: number) {
        this.y = y;
    }
    
    setColor(newColor: string) {
        this.color = newColor;
    }
}