export function randomProperty<T extends string>(keys: T[], blockedKeys: T[]) {
  const filteredKeys = keys.filter((key) => !blockedKeys.includes(key));
  return filteredKeys[(filteredKeys.length * Math.random()) << 0];
}
