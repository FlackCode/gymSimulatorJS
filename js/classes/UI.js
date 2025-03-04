export class UI {
    static drawUI(ctx, dayCount, level, interactingEquipment, gymEquipment, interactableEquipment) {
        ctx.fillStyle = 'black';
        ctx.font = '16px Arial';
        ctx.fillText(`Day: ${dayCount}`, 10, 20);
        ctx.fillText(`Level: ${level}`, 10, 40);

        const welcomeText = "Welcome to the gym!";
        ctx.fillText(welcomeText, ctx.canvas.width / 2 - ctx.measureText(welcomeText).width / 2, 30);
        
        if (interactingEquipment) {
            const { name, maxReps, reps } = interactingEquipment;
            ctx.fillText(`Using: ${name}`, 10, 60);
            ctx.fillText(`Reps: ${reps}/${maxReps}`, 10, 80);
        }

        ctx.font = '16px Arial';
        gymEquipment.forEach(equipment => {
            if (!interactingEquipment) {
                const isInteractable = interactableEquipment.includes(equipment);
                const text = isInteractable ? `Press E to use ${equipment.name}` : equipment.name;
                const textWidth = ctx.measureText(text).width;
                const textX = equipment.x + equipment.width / 2 - textWidth / 2;
                const textY = equipment.y - 10;
                ctx.fillText(text, textX, textY);
            }
        });
    }
}
