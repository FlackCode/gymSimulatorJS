import { UI } from "./UI.js";

export class Player {
    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.x = 100,
        this.y = 100,
        this.width = 30,
        this.height = 30,
        this.speed = 2,
        this.dayCount = 1,
        this.level = 1,
        this.xp = 0;

        this.performingExercise = false;
        this.performedExercises = [];
        this.running = false;
    }

    startDay() {
        this.running = true;
        this.dayCount++;
        UI.updateDay(this.dayCount);
        UI.hideSummary();
        startBtn.textContent = 'End Day';
    }

    endDay() {
        this.running = false;
        UI.showSummary(this.performedExercises);
        this.gainXP(this.dayCount * 5 + this.performedExercises.length * 2);
        this.resetFatigue();
        this.performedExercises = [];
        startBtn.textContent = 'Start Day';
    }

    gainXP(amount) {
        this.xp += amount;
        let xpRequired = 10 * (this.level ** 2);
        console.log(`Gained ${this.xp} XP. ${xpRequired - this.xp} XP required for next level.`);
        while (this.xp >= xpRequired) {
            this.xp -= xpRequired;
            this.level++;
            xpRequired = 10 * (this.level ** 2);
        }

        UI.updateLevel(this.level);
    }

    toggleExercise(exerciseType) {
        const equipment = Object.values(this.exercises).find(exercise => exercise.type === exerciseType);
        if (!equipment) {
            console.log(`Equipment of type ${exerciseType} not found.`);
            return
        }
        this.centerPlayer(this, equipment);
    }

    performRep() {
        if (!this.performingExercise || this.currentExercise === this.exercises.nullExercise) {
            console.log("No active exercise.");
            return;
        }

        if (this.currentExercise.reps >= this.currentExercise.maxReps) {
            console.log("Muscle failure! Can't do more reps.");
            this.currentExercise.fatigue += 0.5;
            return;
        }

        this.currentExercise.reps++;
        this.gainXP(1);
        UI.updateReps(this.currentExercise.reps);
    }


    exercise(exercise) {
        this.performingExercise = true;
        this.currentExercise = exercise;
        this.currentExercise.startSet();
        UI.toggleWeightDisplay(true);
        UI.updateWeight(this.currentExercise.weight);
        UI.toggleRepButton(true);
        console.log(`${this.name} is ${this.currentExercise.name}ing`);
    }

    stopExercising(exercise) {
        this.performingExercise = false;
        this.performedExercises.push({
                fatigue: exercise.fatigue,
                name: exercise.name, 
                reps: exercise.reps
        });
        exercise.endSet();
        UI.updateReps(0);
        UI.toggleWeightDisplay(false);
        UI.toggleRepButton(false);
        console.log(`${this.name} stopped ${exercise.name}ing`);
    }

    resetFatigue() {
        this.performedExercises.forEach(performedExercise => {
            performedExercise.fatigue = 0;
        });
        console.log("Fatigue reset.");
    }

    addWeight(amount = 2.5) {
        if (this.currentExercise.reps > 0) {
            console.log("Cannot change weight during an active set.");
        } else {
            this.currentExercise.addWeight(amount);
            UI.updateWeight(this.currentExercise.weight);
        }
    }

    removeWeight(amount = 2.5) {
        if (this.currentExercise.reps > 0) {
            console.log("Cannot change weight during an active set.");
        } else {
            this.currentExercise.removeWeight(amount);
            UI.updateWeight(this.currentExercise.weight);
        }
    }

    centerPlayer(player, equipment) {
        console.log(equipment);
        player.x = equipment.x + equipment.width / 2 - player.width / 2;
        player.y = equipment.y + equipment.height / 2 - player.height / 2;

        console.log(`Player centered at ${player.x}, ${player.y}`);
    }
}
