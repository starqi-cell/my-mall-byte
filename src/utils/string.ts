// src/utils/string.ts
// 字符串工具函数


export function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function tofixedTwo(num: number): number {
  return Number(num.toFixed(2));
}