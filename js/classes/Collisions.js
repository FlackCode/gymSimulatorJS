export class Collisions {
    static checkCollisions(player, gymEquipment, inputHandler) {
        let interactableEquipment = [];

        gymEquipment.forEach(equipment => {
            const dx = player.x + player.width / 2 - (equipment.x + equipment.width / 2);
            const dy = player.y + player.height / 2 - (equipment.y + equipment.height / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < equipment.interactionRadius) {
                interactableEquipment.push(equipment);

                if (inputHandler.wasKeyPressed("e")) {
                    inputHandler.handleKeyPress("e");
                }
            }
        });

        return interactableEquipment;
    }
}
