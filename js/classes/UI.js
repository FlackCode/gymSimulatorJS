export class UI {
    static updateReps(reps) {
        document.getElementById('repText').textContent = `Reps: ${reps}`;
    }

    static updateWeight(weight) {
        document.getElementById('weightText').textContent = `Weight: ${weight.toFixed(2)}kg`;
    }

    static updateDay(dayCount) {
        document.getElementById('dayCount').textContent = `Day: ${dayCount}`;
    }

    static updateLevel(level) {
        document.getElementById('level').textContent = `Level: ${level}`;
    }

    static showSummary(performedExercises) {
        let summaryText = "Performed Exercises:\n";
        performedExercises.forEach(exercise => {
            summaryText += `${exercise.name}: ${exercise.reps} reps\n`;
        });

        document.getElementById('exercisesPerformed').textContent = summaryText;
        document.getElementById('summary').style.display = 'block';
    }

    static hideSummary() {
        document.getElementById('summary').style.display = 'none';
    }

    static toggleRepButton(show) {
        document.getElementById('repBtn').style.display = show ? 'block' : 'none'; 
        document.getElementById('repText').style.display = show ? 'block' : 'none';
    }

    static toggleWeightDisplay(show) {
        document.getElementById('weightDisplay').style.display = show ? 'block' : 'none';
    }

    static drawUI(ctx, dayCount, level) {
        const dayText = `Day: ${dayCount}`;
        const levelText = `Level: ${level}`;
        ctx.fillStyle = 'black';
        ctx.font = '16px Arial';
        ctx.fillText(dayText, 10, 20);
        ctx.fillText(levelText, 10, 40);
    }
}
