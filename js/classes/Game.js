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

        this.player = new Player('Flack', 'blue', () => {this.interactingEquipment = null;});
        this.inputHandler = new InputHandler(this.player, this);
        this.gymEquipment = [
            new Equipment(300, 200, 50, 50, "gray", "benchPress", "Bench Press", 20, 20),
            new Equipment(500, 300, 50, 50, "gray", "squatRack", "Squat Rack", 20, 20),
        ];
        this.interactableEquipment = [];

        this.interactingEquipment = null;

        this.startGameLoop();
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
        this.inputHandler.movePlayer();
        this.interactableEquipment = Collisions.checkCollisions(this.player, this.gymEquipment, this.inputHandler);
    }

    draw() {
        this.clearCanvas(this.canvas, this.ctx);
        this.drawEquipment(this.gymEquipment, this.ctx);
        this.drawInteractionAreas(this.ctx, this.interactableEquipment);
        this.drawPlayer(this.player, this.ctx);
        UI.drawUI(this.ctx, this.player, this.interactingEquipment, this.gymEquipment, this.interactableEquipment);
    }

    drawEquipment(gymEquipment, ctx) {
        gymEquipment.forEach(equipment => {
            const isInteractable = this.interactableEquipment.includes(equipment);
            equipment.draw(ctx, isInteractable);
        });
    }

    drawPlayer(player, ctx) {
        ctx.fillStyle = player.color;
        ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    drawInteractionAreas(ctx, interactableEquipment) {
        if (!interactableEquipment) return;

        interactableEquipment.forEach(equipment => {
            ctx.fillStyle = "rgba(255, 255, 0, 0.2)";
            ctx.fillRect(
                equipment.x - equipment.interactionRadius / 2,
                equipment.y - equipment.interactionRadius / 2,
                equipment.width + equipment.interactionRadius,
                equipment.height + equipment.interactionRadius
            );
        });
    }

    clearCanvas(canvas, ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}
