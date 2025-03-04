export class InputHandler {
    constructor() {
        this.keys = {};
        this.keyPressed = {};
        window.addEventListener("keydown", (e) => {
            if (!this.keys[e.key]) {
                this.keys[e.key] = true;
                this.keyPressed[e.key] = true;
            }
        });

        window.addEventListener("keyup", (e) => {
            this.keys[e.key] = false;
            this.keyPressed[e.key] = false;
        });
    }

    movePlayer(player) {
        if (this.keys["w"]) player.y -= player.speed;
        if (this.keys["a"]) player.x -= player.speed;
        if (this.keys["s"]) player.y += player.speed;
        if (this.keys["d"]) player.x += player.speed;
    }

    handleInteractions(player, gymEquipment) {
        console.log(`${player.name} is interacting with ${gymEquipment.name}`);
    }

    wasKeyPressed(key) {
        if (!this.keyPressed[key]) return false;
        this.keyPressed[key] = false;
        return true;
    }
}
