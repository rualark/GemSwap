function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function randBoard() {
  let left = [3, 3, 3, 3];
  let res = '';
  let col;
  for (let i = 0; i < 12; ++i) {
    do {
      col = randomIntFromInterval(0, 3);
    } while (left[col] == 0);
    left[col] -= 1;
    res += col;
  }
  return res;
}
