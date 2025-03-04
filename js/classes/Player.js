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
        this.canMove = true;
    }

    gainXP(amount) {
        this.xp += amount;
        let xpRequired = 10 * (this.level ** 2);
        while (this.xp >= xpRequired) {
            this.xp -= xpRequired;
            this.level++;
            xpRequired = 10 * (this.level ** 2);
        }
    }

    startExercise(interactingEquipment) {
        if (!interactingEquipment) return;
        this.centerPlayer(this, interactingEquipment);
        interactingEquipment.startSet();
        this.performingExercise = true;
    }

    performRep(interactingEquipment) {
        if (!interactingEquipment || !this.performingExercise) return;

        if (interactingEquipment.reps >= interactingEquipment.maxReps) {
            console.log("Muscle failure! Can't do more reps.");
            interactingEquipment.fatigue += 0.5;
            return;
        }

        interactingEquipment.reps++;
        this.gainXP(1);
    }

    stopExercise(interactingEquipment) {
        if (!interactingEquipment) return;
        console.log(`Stopped using ${interactingEquipment.name}`);
        this.performedExercises.push({
            fatigue: interactingEquipment.fatigue,
            name: interactingEquipment.name, 
            reps: interactingEquipment.reps
        });
        interactingEquipment.endSet();
        this.performingExercise = false;
        interactingEquipment = null;
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
        }
    }

    removeWeight(amount = 2.5) {
        if (this.currentExercise.reps > 0) {
            console.log("Cannot change weight during an active set.");
        } else {
            this.currentExercise.removeWeight(amount);
        }
    }

    centerPlayer(player, equipment) {
        player.x = equipment.x + equipment.width / 2 - player.width / 2;
        player.y = equipment.y + equipment.height / 2 - player.height / 2;
    }
}
