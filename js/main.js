// import { Player } from "./classes/Player.js";

// const startBtn = document.getElementById('startBtn');
// const player = new Player('Flack');

// startBtn.addEventListener('click', () => {
//     if (!player.running) {
//         player.startDay();
//     } else if (player.currentExercise === player.exercises.nullExercise) {
//         player.endDay();
//     } else {
//         console.log(`Cannot end day while ${player.currentExercise.name}ing`);
//     }
// });

// document.querySelectorAll('.exerciseBtn').forEach(btn => {
//     btn.addEventListener('click', () => player.toggleExercise(btn.dataset.exercise));
// });

// repBtn.addEventListener('click', () => {
//     if (player.running) {
//         player.performRep();
//     } else {
//         console.log("Cannot perform rep");
//     }
// });

// document.getElementById('addWeightBtn').addEventListener('click', () => player.addWeight());
// document.getElementById('removeWeightBtn').addEventListener('click', () => player.removeWeight());

import { Game } from "./classes/Game.js";

const game = new Game();

game.startGameLoop();
