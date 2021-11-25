import { getCurrentDist, randDistBoard } from "../algorithm/dist.js";
import { randBoard } from "../algorithm/generator.js";
import { clearHistory, undo } from "../data/history.js";
import { state } from "../data/state.js";
import { showBoard, showDist, showHint } from "../ui/board.js";

export function newGame(dist) {
  clearHistory();
  if (dist) {
    state.board = randDistBoard(dist);
  } else {
    state.board = randBoard();
  }
  showBoard();
  getCurrentDist();
  showDist();
}

export function initCommands() {
  for (let command of commands) {
    document.getElementById(command.id)[command.event] = function() {
      command.command();
      return false;
    };
  }
  for (let i = 1; i < 12; ++i) {
    document.getElementById(`d${i}`).onclick = function() {
      newGame(i);
      return false;
    };
  }
}

export let commands = [
  {
    id: 'hint',
    event: 'onclick',
    command: () => { 
      showHint();
    },
  },
  {
    id: 'undo',
    event: 'onclick',
    command: () => { 
      undo();
    },
  },
];
