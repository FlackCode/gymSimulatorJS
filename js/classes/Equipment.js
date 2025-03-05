export class Equipment {
    constructor(x, y, width, height, color, type, name, baseStrength, weight) {
        //Equipment related variables (for drawing purposes)
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.type = type;
        this.name = name;
        this.interactionRadius = 60;

        //Exercise related variables (for logic purposes)
        this.baseStrength = baseStrength;
        this.strength = baseStrength;
        this.weight = weight;
        this.started = false;
        this.reps = 0;
        this.maxReps = 0;
        this.repsInReserve = 0;
        this.fatigue = 0;
        this.maxFatigue = 10;
    }
    //Draws the equipment on the canvas
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
    //Logic functions
    calculateMaxReps() {
        const fatigueFactor = 0.15;
        const safeFatigue = Math.min(this.fatigue, this.maxFatigue);
        const effectiveWeight = Math.max(this.weight, 1);
    
        let reps = this.strength / (effectiveWeight * fatigueFactor * (1 + safeFatigue));
        reps = Math.max(0, Math.floor(reps));
    
        return reps;
    }

    startSet() {
        this.maxReps = this.calculateMaxReps();
        if (this.maxReps > 0) {
            console.log(`Starting set of ${this.name}`);
            this.started = true;
            this.reps = 0;
        } else {
            console.log(`Too fatigued to continue.`);
            this.fatigue = Math.min(this.fatigue + 1, this.maxFatigue);
        }
    }

    endSet() {
        this.repsInReserve = this.maxReps - this.reps;
        let strengthGain = 0;
        if (this.repsInReserve == 1 && (this.maxReps <= 6 && this.maxReps >= 4)) {
            strengthGain += 1.25 + 1 * (this.weight / 100);
        } else if (this.reps > 0) {
            strengthGain += 0.25;
        }
        strengthGain *= Math.max(0.5, 1 - (this.strength / 100));

        this.strength += strengthGain;
        if (this.maxReps > 0) {
            this.fatigue += (this.reps / this.maxReps) * (this.weight / 50);
        } else {
            this.fatigue += 0.5;
        }
        this.fatigue = Math.min(this.fatigue, this.maxFatigue);
        this.started = false;
        this.repsInReserve = 0;
        this.reps = 0;
    }

    addWeight(amount = 2.5) {
        this.weight += amount;
        this.maxReps = this.calculateMaxReps();
        console.log(`Weight increased to ${this.weight.toFixed(2)}`);
    }

    removeWeight(amount = 2.5) {
        this.weight = Math.max(0, this.weight - amount);
        this.maxReps = this.calculateMaxReps();
        console.log(`Weight decreased to ${this.weight.toFixed(2)}`);
    }
}
