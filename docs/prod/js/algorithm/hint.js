import { state } from "../data/state.js";
import { string2digest } from "../lib/digest.js";
import { swap } from "../lib/string.js";
import { dists } from "./dist.js";

function neighbors(state) {
  let res = [];
  for (let y = 0; y < 3; ++y) {
    for (let x = 0; x < 3; ++x) {
      let p = x + y * 4;
      let ar = state.split('');
      swap(ar, p, p + 1);
      res.push(ar.join(''));
    }
  }
  for (let y = 0; y < 2; ++y) {
    for (let x = 0; x < 4; ++x) {
      let p = x + y * 4;
      let ar = state.split('');
      swap(ar, p, p + 4);
      res.push(ar.join(''));
    }
  }
  return res;
}

export function getHint() {
  let possibleMoves = [];
  for (let nei of neighbors(state.board)) {
    if (state.dist > dists[string2digest(nei)]) {
      possibleMoves.push(nei);
    }
  }
  if (possibleMoves.length == 0) {
    console.error('Cannot find possible move');
    return;
  }
  console.log('Possible moves:', possibleMoves.length)
  let hint = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
  let changes = [];
  for (let y = 0; y < 3; ++y) {
    for (let x = 0; x < 4; ++x) {
      if (hint[x + y * 4] != state.board[x + y * 4]) {
        changes.push({
          x: x,
          y: y
        });
      }
    }
  }
  return changes;
}
