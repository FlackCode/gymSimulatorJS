import { Collisions } from "./Collisions.js";
import { Equipment } from "./Equipment.js";
import { InputHandler } from "./InputHandler.js";
import { Player } from "./Player.js";
import { UI } from "./UI.js";

export class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 800;
        this.canvas.height = 600;

        this.player = new Player('Flack', 'blue');
        this.inputHandler = new InputHandler();
        this.gymEquipment = [
            new Equipment(300, 200, 50, 50, "gray", "benchPress", "Bench Press", 20, 20),
            new Equipment(500, 300, 50, 50, "gray", "squatRack", "Squat Rack", 20, 20),
        ];
        this.interactableEquipment = [];

        this.interactingEquipment = null;

        this.startGameLoop();
    }

    setupInputListeners() {
        window.addEventListener('keydown', (e) => {
            if (e.key === "e" && this.interactableEquipment.length > 0) {
                this.interactingEquipment = this.interactableEquipment[0];
                this.startExercise();
            } else if (e.key === "r" && this.interactingEquipment) {
                this.performRep();
            } else if (e.key === "q" && this.interactingEquipment) {
                this.stopExercise();
            }
        });
    }

    startExercise() {
        if (!this.interactingEquipment) return;
        console.log(`Started using ${this.interactingEquipment.name}`);
        this.interactingEquipment.startSet();
        this.player.performingExercise = true;
    }

    stopExercise() {
        if (!this.interactingEquipment) return;
        console.log(`Stopped using ${this.interactingEquipment.name}`);
        this.interactingEquipment.endSet();
        this.player.performingExercise = false;
        this.interactingEquipment = null;
    }

    performRep() {
        if (!this.interactingEquipment || !this.player.performingExercise) return;
        this.interactingEquipment.reps++;
        console.log(`Performed rep on ${this.interactingEquipment.name}: ${this.interactingEquipment.reps}`);
    }

    startGameLoop() {
        const loop = () => {
            this.update();
            this.draw();
            requestAnimationFrame(loop);
        }
        loop();
    }

    update() {
        this.inputHandler.movePlayer(this.player);
        this.interactableEquipment = Collisions.checkCollisions(this.player, this.gymEquipment, this.inputHandler);
    }

    draw() {
        this.clearCanvas(this.canvas, this.ctx);
        this.drawEquipment(this.gymEquipment, this.ctx);
        this.drawInteractionAreas(this.ctx, this.interactableEquipment);
        this.drawPlayer(this.player, this.ctx);
        UI.drawUI(this.ctx, this.player.dayCount, this.player.level);
    }

    drawEquipment(gymEquipment, ctx) {
        gymEquipment.forEach(equipment => {
            equipment.draw(ctx);
        });
    }

    drawPlayer(player, ctx) {
        ctx.fillStyle = player.color;
        ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    drawInteractionAreas(ctx, interactableEquipment) {
        if (!this.interactableEquipment) return;

        interactableEquipment.forEach(equipment => {
            ctx.fillStyle = "rgba(255, 255, 0, 0.2)";
            ctx.fillRect(
                equipment.x - equipment.interactionRadius / 2,
                equipment.y - equipment.interactionRadius / 2,
                equipment.width + equipment.interactionRadius,
                equipment.height + equipment.interactionRadius
            );

            const text = `Press E to use ${equipment.name}`;
            const textWidth = ctx.measureText(text).width;
            const textX = equipment.x + equipment.width / 2 - textWidth / 2;

            ctx.fillStyle = "black";
            ctx.font = "16px Arial";
            ctx.fillText(text, textX, equipment.y - 10);
        });     
    }

    clearCanvas(canvas, ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}
