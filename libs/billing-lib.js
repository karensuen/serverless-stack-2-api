export function calculateCost(storage) {
  // 10 or less notes, rate = $4 p/note
  // between 10 and 100 notes, rate = $2 p/note
  // more than 100 notes, rate = $1 p/note
  const rate = storage <= 10
    ? 4
    : storage <= 100
      ? 2
      : 1;
  return rate * storage * 100;
}
