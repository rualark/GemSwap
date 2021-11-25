import { compressedPreCalculatedDists } from "../data/dists.js";
import { digest2string, string2digest } from "../lib/digest.js";
import { state } from "../data/state.js";

export let dists = {};
export let boardsByDist = [];

function genall(level, state, left, callback) {
  if (level == 12) {
    callback(state);
    return;
  }
  for (let i = 0; i < 4; ++i) {
    if (left[i]) {
      left[i]--;
      let state2 = state;
      if (i % 2) {
        state2 += 1 << (level * 2);
      }
      if (Math.floor(i / 2) % 2) {
        state2 += 1 << (level * 2 + 1);
      }
      genall(level + 1, state2, left, callback);
      left[i]++;
    }
  }
}

export function loadDists() {
  for (let i = 0; i < 12; ++i) {
    boardsByDist.push([]);
  }
  let pos = 0;
  let unpackedDists = LZString.decompressFromBase64(compressedPreCalculatedDists);
  genall(0, 0, [3, 3, 3, 3], (digest) => {
    let dist = unpackedDists[pos++];
    if (dist == 'A') dist = 10;
    if (dist == 'B') dist = 11;
    dists[digest] = parseInt(dist);
    boardsByDist[dist].push(digest);
  });
}

export function getCurrentDist() {
  state.dist = dists[string2digest(state.board)];
}

export function randDistBoard(dist) {
  let boards = boardsByDist[dist];
  return digest2string(boards[Math.floor(Math.random() * boards.length)]);
}