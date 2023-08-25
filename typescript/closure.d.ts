export function closure(name: string, lastname: string, callback: (result: { fullName: string, uppercase: () => string }) => void): { fullName: string, uppercase: () => string };
