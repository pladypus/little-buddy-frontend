export function randomProperty<T extends {}>(obj: T): keyof T {
  const keys = Object.keys(obj);
  return keys[(keys.length * Math.random()) << 0] as keyof T;
}
