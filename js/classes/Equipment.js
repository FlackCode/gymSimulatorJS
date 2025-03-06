export class Equipment {
    constructor(x, y, width, height, color, type, name, baseStrength, weight, muscleGroup) {
        //Equipment related variables (for drawing purposes)
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.type = type;
        this.name = name;
        this.interactionRadius = 60;
        this.muscleGroup = muscleGroup;

        //Exercise related variables (for logic purposes)
        this.weight = weight;
        this.fatigue = 0;
        this.maxFatigue = 10;
    }
    //Draws the equipment on the canvas
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    //Logic functions
    addWeight(amount = 2.5) {
        this.weight += amount;
        console.log(`Weight increased to ${this.weight.toFixed(2)}`);
    }

    removeWeight(amount = 2.5) {
        this.weight = Math.max(0, this.weight - amount);
        console.log(`Weight decreased to ${this.weight.toFixed(2)}`);
    }
}
