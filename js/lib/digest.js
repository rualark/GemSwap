export function digest2string(d) {
  let st = '';
  for (let i = 0; i < 12; ++i) {
    let bit1 = (d >> (i * 2)) & 1;
    let bit2 = (d >> (i * 2 + 1)) & 1;
    let digit = bit1 + (bit2 << 1);
    st += digit;
  }
  return st;
}

export function string2digest(st) {
  let digest = 0;
  for (let i = 0; i < 12; ++i) {
    let digit = parseInt(st[i]);
    if (digit % 2) {
      digest += 1 << (i * 2);
    }
    if (Math.floor(digit / 2) % 2) {
      digest += 1 << (i * 2 + 1);
    }
  }
  return digest;
}
