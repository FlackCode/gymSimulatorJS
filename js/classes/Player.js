import { Strength } from "./Strength.js";

export class Player {
    constructor(name, color, stopExerciseCallback) {
        this.name = name;
        this.color = color;
        this.stopExerciseCallback = stopExerciseCallback;
        this.x = 100,
        this.y = 100,
        this.width = 30,
        this.height = 30,
        this.speed = 2,
        this.dayCount = 1,
        this.level = 1,
        this.xp = 0;
        this.xpRequired = 10;

        this.performingExercise = false;
        this.performedExercises = [];
        this.canMove = true;
        this.currentExercise = null;
        this.reps = 0;
        this.maxReps = 0;

        this.strength = new Strength();
    }

    gainXP(amount) {
        this.xp += amount;
        let xpReq = 10 * (this.level ** 2);
        while (this.xp >= xpReq) {
            this.xp -= xpReq;
            this.level++;
            xpReq = 10 * (this.level ** 2);
            this.xpRequired = xpReq;
        }
    }

    calculateMaxReps(equipment) {
        if (!equipment) return 0;

        const fatigueFactor = 0.15;
        const safeFatigue = Math.min(equipment.fatigue, equipment.maxFatigue);
        const effectiveWeight = Math.max(equipment.weight, 1);
        const playerStrength = this.strength.getStrength(equipment.muscleGroup);

        let reps = playerStrength / (effectiveWeight * fatigueFactor * (1 + safeFatigue));
        reps = Math.max(0, Math.floor(reps));
    
        return reps;

    }

    startExercise(equipment) {
        if (!equipment) return;
        if (this.performingExercise) return;

        if (Math.ceil(equipment.fatigue) >= equipment.maxFatigue) {
            console.log(`${this.name} is too fatigued to perform this exercise.`);
            this.stopExerciseCallback();
            return;
        }

        this.canMove = false;
        this.centerPlayer(this, equipment);
        this.currentExercise = equipment;
        this.maxReps = this.calculateMaxReps(equipment);
        this.performingExercise = true;
        this.reps = 0;
    }

    performRep() {
        if (!this.currentExercise || !this.performingExercise) return;

        if (this.reps + 1 >= this.maxReps) {
            console.log("Muscle failure! Can't do more reps.");
            this.currentExercise.fatigue += 1;
            this.stopExercise();
            return;
        }

        this.reps++;
        this.currentExercise.fatigue += 0.1;
        this.gainXP(1);

        if (this.reps === this.maxReps) {
            this.stopExercise();
        }
    }

    stopExercise() {
        if (!this.currentExercise) return;

        console.log(`Stopped using ${this.currentExercise.name}`);
        
        this.performedExercises.push({
            fatigue: this.currentExercise.fatigue,
            name: this.currentExercise.name, 
            reps: this.currentExercise.reps
        });

        const strengthGain = this.strength.calculateStrengthGain(this.currentExercise);
        this.strength.increaseStrength(this.currentExercise.muscleGroup, strengthGain);

        //Progressive overload
        if (this.reps >= this.maxReps - 1) {
            this.currentExercise.addWeight(1.25);
        }

        //Fatigue calculation
        if (this.maxReps > 0) {
            this.currentExercise.fatigue += (this.reps / this.maxReps) * (this.currentExercise.weight / 50);
        } else {
            this.currentExercise.fatigue += 0.5;
        }
        this.currentExercise.fatigue = Math.min(this.currentExercise.fatigue, this.currentExercise.maxFatigue);

        this.performingExercise = false;
        this.canMove = true;
        this.currentExercise = null;

        if (this.stopExerciseCallback) this.stopExerciseCallback();
    }

    resetFatigue() {
        this.performedExercises.forEach(exercise => {
            exercise.fatigue = 0;
        });
        console.log("Fatigue reset.");
    }

    centerPlayer(player, equipment) {
        player.x = equipment.x + equipment.width / 2 - player.width / 2;
        player.y = equipment.y + equipment.height / 2 - player.height / 2;
    }
}
