export function percentChange(baseVal: number, newVal: number) {
  return (newVal - baseVal) / Math.abs(baseVal);
}
