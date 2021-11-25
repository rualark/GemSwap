import { getCurrentDist } from "../algorithm/dist.js";
import { showBoard, showDist } from "../ui/board.js";
import { state } from "./state.js";

export let hist = [];

export function saveHistory() {
  hist.push({
    board: state.board,
    dist: state.dist,
    good: state.good
  });
}

export function undo() {
  if (hist.length == 0) return;
  let prev_state = hist.pop(state);
  state.board = prev_state.board;
  state.good = prev_state.good;
  showBoard();
  getCurrentDist();
  showDist();
}

export function clearHistory() {
  hist = [];
}
