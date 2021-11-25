import { string2digest } from "../lib/digest.js";
import { dists, getCurrentDist } from "../algorithm/dist.js";
import { state } from "../data/state.js";
import { swapStr } from "../lib/string.js";
import { getHint } from "../algorithm/hint.js";
import { hist, saveHistory } from "../data/history.js";

let icons = [
  'img/stones/red.png',
  'img/stones/oblique.png',
  'img/stones/violet.png',
  'img/stones/yellow.png',
];

function makeCellId(x, y) {
  return 'c' + x + y;
}

export function showBoard() {
  for (let y = 0; y < 3; ++y) {
    for (let x = 0; x < 4; ++x) {
      document.getElementById(makeCellId(x, y)).src = icons[state.board[x + y * 4]];
    }
  }
}

export function showDist() {
  document.getElementById("difficulty").innerHTML = 'Difficulty: ' + state.dist;
  if (state.good) {
    document.getElementById("difficulty").style.color = "green";
  } else {
    document.getElementById("difficulty").style.color = "red";
  }
}

function blink(x, y, time, repetitions) {
  let el = document.getElementById(makeCellId(x, y));
  el.style.animation = `blink ${time} ${repetitions}`;
  setTimeout(() => {
    el.style.removeProperty('animation');
  }, 1500);
}

export function showHint() {
  let changes = getHint();
  blink(changes[0].x, changes[0].y, '0.5s', 3);
  blink(changes[1].x, changes[1].y, '0.5s', 3);
}

export function initBoard() {
  for (let y = 0; y < 3; ++y) {
    for (let x = 0; x < 4; ++x) {
      document.getElementById(makeCellId(x, y)).onclick = function() {
        cellClicked(x, y);
        return false;
      };
    }
  }  
}

function swapCells(x1, y1, x2, y2) {
  let new_board = swapStr(state.board, x1 + y1 * 4, x2 + y2 * 4);
  let new_dist = dists[string2digest(new_board)];
  saveHistory();

  if (new_dist >= state.dist) {
    state.good = false;
    setTimeout(() => {
      lost(x1, y1, x2, y2);
    }, 10);
  }

  state.board = new_board;
  showBoard();
  getCurrentDist();
  showDist();
  if (state.dist == 0) {
    setTimeout(win, 10);
  }
}

function win() {
  for (let y = 0; y < 3; ++y) {
    for (let x = 0; x < 4; ++x) {
      blink(x, y, '0.5s', 3);
    }
  }
}

function lost(x1, y1, x2, y2) {
  blink(x1, y1, '0.1s', 10);
  blink(x2, y2, '0.1s', 10);
}

function cellClicked(x, y) {
  return;
  let el = document.getElementById(makeCellId(x, y));
  let sx = state.selection.x;
  let sy = state.selection.y;
  if (state.selection.active) {
    // Disable selected animation
    let el2 = document.getElementById(makeCellId(state.selection.x, state.selection.y));
    el2.style.removeProperty('animation');
    if (x == sx && y == sy) {
      // Same - remove selection
      state.selection.active = false;
    } else if (x == sx && Math.abs(y-sy) == 1 || y == sy && Math.abs(x - sx) == 1) {
      // Swap
      state.selection.active = false;
      swapCells(x, y, sx, sy);
    } else {
      // Far
      el.style.animation = 'blink 0.7s infinite';
      state.selection.x = x;
      state.selection.y = y;
    }
  } else {
    el.style.animation = 'blink 0.7s infinite';
    state.selection.active = true;
    state.selection.x = x;
    state.selection.y = y;
  }
}
