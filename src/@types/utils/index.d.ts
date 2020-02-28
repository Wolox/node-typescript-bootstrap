/**
 * DeepPartial Interface converts all object property to optional
 * Contrary to Partial<T> this implementation works with deep properties
 */
export type DeepPartial<T> = T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } : T;
