export interface Dictionary<T = any> {
  [index: string]: T
}

export type ContextOptions = Dictionary<string>
