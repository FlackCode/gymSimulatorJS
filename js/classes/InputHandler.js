export class InputHandler {
    constructor(player, game) {
        this.keys = {};
        this.keyPressed = {};
        this.player = player;
        this.game = game;
        window.addEventListener("keydown", (e) => {
            if (!this.keys[e.key]) {
                this.keys[e.key] = true;
                this.keyPressed[e.key] = true;
            }

            this.handleKeyPress(e.key);
        });

        window.addEventListener("keyup", (e) => {
            this.keys[e.key] = false;
            this.keyPressed[e.key] = false;
        });
    }

    movePlayer() {
        if (this.keys["w"]) this.player.y -= this.player.speed;
        if (this.keys["a"]) this.player.x -= this.player.speed;
        if (this.keys["s"]) this.player.y += this.player.speed;
        if (this.keys["d"]) this.player.x += this.player.speed;
    }

    handleKeyPress(key) {
        if (key === "e" && this.game.interactableEquipment.length > 0) {
            this.game.interactingEquipment = this.game.interactableEquipment[0];
            this.player.startExercise(this.game.interactingEquipment);
        } else if (key === "r" && this.game.interactingEquipment) {
            this.player.performRep(this.game.interactingEquipment);
        } else if (key === "q" && this.game.interactingEquipment) {
            this.player.stopExercise(this.game.interactingEquipment);
        }
    }

    wasKeyPressed(key) {
        if (!this.keyPressed[key]) return false;
        this.keyPressed[key] = false;
        return true;
    }
}
