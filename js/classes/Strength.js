export class Strength {
    constructor() {
        this.muscleGroups = {
            chest: 20,
            back: 20,
            arms: 20,
            legs: 20,
            core: 20,
            shoulders: 20
        };
    }

    increaseStrength(muscleGroup, amount) {
        if (this.muscleGroups[muscleGroup] == undefined) return;

        this.muscleGroups[muscleGroup] += amount;
        console.log(`Strength in ${muscleGroup} increased to ${this.muscleGroups[muscleGroup]}`);
    }

    getStrength(muscleGroup) {
        return this.muscleGroups[muscleGroup] || 0;
    }

    calculateStrengthGain(player, equipment) {
        
        let strengthGain = 0;
        if (player.repsInReserve == 1 && (player.maxReps <= 6 && player.maxReps >= 4)) {
            strengthGain += 1.25 + (1 * (equipment.weight / 100)/player.maxReps);
            console.log("test1")
        } else if (player.reps > 0) {
            strengthGain += 0.25;
            console.log("test2")
        }
        strengthGain *= Math.max(0.5, 1 - (this.getStrength(equipment.muscleGroup) / 100));
        strengthGain = Number(strengthGain.toFixed(2));

        return strengthGain;
    }
}
