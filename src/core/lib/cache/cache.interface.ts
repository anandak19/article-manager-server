export interface ICacheService {
  get<T>(key: string): Promise<T | undefined>;

  set<T>(key: string, value: T, ttl?: number | string): Promise<void>;

  delete(key: string): Promise<void>;

  getReminingTime(key: string): Promise<number | undefined>;

  has(key: string): Promise<boolean>;

  clear(): Promise<void>;
}
