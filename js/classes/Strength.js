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
    }

    getStrength(muscleGroup) {
        return this.muscleGroups[muscleGroup] || 0;
    }

    calculateStrengthGain(equipment) {
        let strengthGain = 0;
        if (equipment.repsInReserve == 1 && (equipment.maxReps <= 6 && equipment.maxReps >= 4)) {
            strengthGain += 1.25 + 1 * (equipment.weight / 100);
        } else if (equipment.reps > 0) {
            strengthGain += 0.25;
        }
        strengthGain *= Math.max(0.5, 1 - (this.getStrength(equipment.muscleGroup) / 100));

        return strengthGain;
    }
}
