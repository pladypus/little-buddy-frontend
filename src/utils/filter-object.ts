export function filterObj<T extends {}>(obj: T, blockedKeys: (keyof T)[]) {
  type k = keyof T;
  const keys = Object.keys(obj) as k[];

  return keys
    .filter((key) => !blockedKeys.includes(key))
    .reduce<{ [key: string]: any }>((prev, key) => {
      prev[key as string] = obj[key];
      return prev;
    }, {});
}
