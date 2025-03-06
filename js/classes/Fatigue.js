export class Fatigue {
    constructor() {
        this.muscleGroups = {
            chest: 0,
            back: 0,
            arms: 0,
            legs: 0,
            core: 0,
            shoulders: 0
        };

        this.maxFatigue = 10;
    }

    increaseFatigue(muscleGroup, amount) {
        if (this.muscleGroups[muscleGroup] == undefined) return;

        this.muscleGroups[muscleGroup] = Math.min(this.muscleGroups[muscleGroup] + amount, this.maxFatigue);
    }

    resetFatigue() {
        for (let muscle in this.muscleGroups) {
            this.muscleGroups[muscle] = 0;
        }
        console.log("Fatigue reset.");
    }

    getFatigue(muscleGroup) {
        return this.muscleGroups[muscleGroup] || 0;
    }
}
