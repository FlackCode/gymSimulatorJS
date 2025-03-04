export class UI {
    static drawUI(ctx, dayCount, level, interactingEquipment) {
        const dayText = `Day: ${dayCount}`;
        const levelText = `Level: ${level}`;
        ctx.fillStyle = 'black';
        ctx.font = '16px Arial';
        ctx.fillText(dayText, 10, 20);
        ctx.fillText(levelText, 10, 40);
        
        if (interactingEquipment) {
            const { name, maxReps, reps } = interactingEquipment;
            const repText = `Reps: ${reps}/${maxReps}`;
            const nameText = `Using: ${name}`;
            ctx.fillText(nameText, 10, 60);
            ctx.fillText(repText, 10, 80);
        }
    }
}
