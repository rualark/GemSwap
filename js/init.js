import { initCommands, newGame } from "./commands/commands.js";
import { dists, loadDists } from "./algorithm/dist.js";
import { initBoard } from "./ui/board.js";

function init() {
  initCommands();
  initBoard();
  loadDists();
  newGame();
}

init();
