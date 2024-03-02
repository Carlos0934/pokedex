export type CacheKey = string | string[];
export interface Cache {
  get<T>(key: CacheKey): Promise<T | null>;
  set<T>(key: CacheKey, value: T): Promise<void>;
}

export class MemoryCache implements Cache {
  private store = new Map<string, unknown>();

  private generateKey(key: CacheKey): string {
    if (Array.isArray(key)) {
      return key.join(":");
    }
    return key;
  }
  get<T = unknown>(key: CacheKey): Promise<T | null> {
    const stringKey = this.generateKey(key);
    const value = this.store.get(stringKey);
    if (value) {
      return Promise.resolve(value as T);
    }
    return Promise.resolve(null);
  }

  set<T>(key: CacheKey, value: T): Promise<void> {
    const stringKey = this.generateKey(key);

    this.store.set(stringKey, value);
    return Promise.resolve();
  }
}

export class KvCache implements Cache {
  constructor(
    private readonly kv: Deno.Kv,
    private readonly lifeTime: number = 1000 * 60 * 60,
  ) {
  }

  async get<T = unknown>(key: CacheKey): Promise<T | null> {
    const entry = await this.kv.get<T>(this.generateCacheKey(key));

    return entry.value;
  }

  async set<T>(key: CacheKey, value: T): Promise<void> {
    await this.kv.set(this.generateCacheKey(key), value, {
      expireIn: this.lifeTime,
    });
  }

  private generateKey(key: CacheKey, prefix: string): string[] {
    if (Array.isArray(key)) {
      return [prefix, ...key];
    }
    return [prefix, ...key];
  }
  private generateCacheKey(key: CacheKey): string[] {
    return this.generateKey(key, "cache");
  }
}
