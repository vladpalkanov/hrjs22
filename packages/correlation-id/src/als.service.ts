import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'node:async_hooks';

@Injectable()
export class ALSService {
  private readonly als = new AsyncLocalStorage<Map<string, any>>();

  runWithContext(callback: () => void): void {
    this.als.run(new Map(), callback);
  }

  set(key: string, value: any): void {
    const store = this.als.getStore();
    if (store) {
      store.set(key, value);
    }
  }

  get<T>(key: string): T | undefined {
    const store = this.als.getStore();
    return store?.get(key);
  }
}
