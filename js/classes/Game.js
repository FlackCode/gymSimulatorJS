import { Collisions } from "./Collisions.js";
import { Equipment } from "./Equipment.js";
import { InputHandler } from "./InputHandler.js";
import { Player } from "./Player.js";
import { Tile } from "./Tile.js";
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
            new Equipment(300, 200, 50, 50, "gray", "benchPress", "Bench Press", 20, 20, "chest"),
            new Equipment(500, 300, 50, 50, "gray", "squatRack", "Squat Rack", 20, 20, "legs"),
        ];
        this.dayAdvanceTile = new Tile(200, 200, 50, 50, "yellow", "dayAdvance");

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
        this.dayAdvanceTile.draw(this.ctx);
        this.drawEquipment(this.gymEquipment, this.ctx);
        this.drawInteractionAreas(this.ctx, this.interactableEquipment);
        this.drawPlayer(this.player, this.ctx);
        UI.drawUI(this.ctx, this.player, this.interactingEquipment, this.gymEquipment, this.interactableEquipment);
    }

    drawEquipment(gymEquipment, ctx) {
        gymEquipment.forEach(equipment => {
            const isInteractable = this.interactableEquipment.includes(equipment);
            if (this.interactingEquipment === equipment) {
                ctx.strokeStyle = 'purple';
                ctx.lineWidth = 6;
                ctx.strokeRect(equipment.x, equipment.y, equipment.width, equipment.height);
            }
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
            if (this.interactingEquipment !== equipment) {
                ctx.strokeStyle = "green";
                ctx.lineWidth = 2;
                ctx.strokeRect(equipment.x, equipment.y, equipment.width, equipment.height)
        }});
    }

    clearCanvas(canvas, ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    advanceDay() {
        this.player.dayCount++;
        this.player.resetFatigue();
    }
}
