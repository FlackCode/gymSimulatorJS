export class UI {
    static drawUI(ctx, player, interactingEquipment, gymEquipment, interactableEquipment) {
        const {dayCount, level, xpRequired, xp} = player;
        ctx.fillStyle = 'black';
        ctx.font = '16px Arial';
        ctx.fillText(`Day: ${dayCount}`, 10, 20);
        ctx.fillText(`Level: ${level}`, 10, 40);
        ctx.fillText(`XP: ${xp}/${xpRequired}`, 10, 60);

        const progressBarWidth = 100;
        const progressBarHeight = 20;
        const progressBarX = 10;
        const progressBarY = 65;

        ctx.fillStyle = 'lightgray';
        ctx.fillRect(progressBarX, progressBarY, progressBarWidth, progressBarHeight);

        const xpProgress = (xp / xpRequired) * progressBarWidth;
        ctx.fillStyle = 'green';
        ctx.fillRect(progressBarX + 2, progressBarY + 2, xpProgress, progressBarHeight - 5);

        ctx.fillStyle = 'black';

        const welcomeText = "Welcome to the gym!";
        ctx.fillText(welcomeText, ctx.canvas.width / 2 - ctx.measureText(welcomeText).width / 2, 30);
        
        if (interactingEquipment) {
            const { name, maxReps, reps } = interactingEquipment;
            ctx.fillText(`Using: ${name}`, 10, 100);
            ctx.fillText(`Reps: ${reps}/${maxReps}`, 10, 120);
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
