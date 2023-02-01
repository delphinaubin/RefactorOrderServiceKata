export declare function fetch<R = any, P = any>(
  request: string,
  options?: { method?: string; payload?: P; headers: { Authorization: string } }
): Promise<{ json: () => Promise<R> }>;