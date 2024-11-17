export class Point {
    constructor(x, y, color = '') {
        this.x = x;
        this.y = y;
        this.color = color;
    }
    hasTouch(p) {
        let x = this.x;
        let y = this.y;
        if (x === p.x && y === p.y)
            return true;
        return false;
    }
    isEmptyPos() {
        if (!this.hasTouch(this))
            return true;
        return false;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getColor() {
        return this.color;
    }
    setX(x) {
        this.x = x;
    }
    setY(y) {
        this.y = y;
    }
    setColor(newColor) {
        this.color = newColor;
    }
}
