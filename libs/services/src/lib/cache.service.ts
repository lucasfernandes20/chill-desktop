import { Injectable } from '@angular/core';

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  /**
   * Obtém dados do cache se estiver válido
   * @param key Chave do cache
   * @param maxAge Idade máxima em millisegundos
   * @returns Dados do cache ou null se inválido/inexistente
   */
  get<T>(key: string, maxAge: number): T | null {
    try {
      const cached = localStorage.getItem(key);
      if (!cached) {
        return null;
      }

      const entry: CacheEntry<T> = JSON.parse(cached);
      const age = Date.now() - entry.timestamp;

      if (age > maxAge) {
        this.remove(key);
        return null;
      }

      return entry.data;
    } catch (error) {
      console.warn(`Erro ao ler cache '${key}':`, error);
      return null;
    }
  }

  /**
   * Salva dados no cache
   * @param key Chave do cache
   * @param data Dados a serem salvos
   */
  set<T>(key: string, data: T): void {
    try {
      const entry: CacheEntry<T> = {
        data,
        timestamp: Date.now(),
      };
      localStorage.setItem(key, JSON.stringify(entry));
    } catch (error) {
      console.warn(`Erro ao salvar cache '${key}':`, error);
    }
  }

  /**
   * Remove uma entrada específica do cache
   * @param key Chave do cache
   */
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Erro ao remover cache '${key}':`, error);
    }
  }

  /**
   * Verifica se o cache é válido
   * @param key Chave do cache
   * @param maxAge Idade máxima em millisegundos
   * @returns true se o cache existe e é válido
   */
  isValid(key: string, maxAge: number): boolean {
    try {
      const cached = localStorage.getItem(key);
      if (!cached) {
        return false;
      }

      const entry: CacheEntry<unknown> = JSON.parse(cached);
      const age = Date.now() - entry.timestamp;

      return age <= maxAge;
    } catch (error) {
      console.warn(`Erro ao verificar cache '${key}':`, error);
      return false;
    }
  }

  /**
   * Limpa todo o cache (ou cache com prefixo específico)
   * @param prefix Prefixo opcional para limpar apenas caches específicos
   */
  clear(prefix?: string): void {
    try {
      if (prefix) {
        const keys = Object.keys(localStorage);
        keys.forEach((key) => {
          if (key.startsWith(prefix)) {
            localStorage.removeItem(key);
          }
        });
      } else {
        localStorage.clear();
      }
    } catch (error) {
      console.warn('Erro ao limpar cache:', error);
    }
  }

  /**
   * Obtém informações sobre o cache
   * @param key Chave do cache
   * @returns Informações sobre o cache ou null se não existir
   */
  getInfo(key: string): { age: number; exists: boolean; size: string } | null {
    try {
      const cached = localStorage.getItem(key);
      if (!cached) {
        return { age: 0, exists: false, size: '0 bytes' };
      }

      const entry: CacheEntry<unknown> = JSON.parse(cached);
      const age = Date.now() - entry.timestamp;
      const size = new Blob([cached]).size;

      return {
        age,
        exists: true,
        size: `${size} bytes`,
      };
    } catch (error) {
      console.warn(`Erro ao obter info do cache '${key}':`, error);
      return null;
    }
  }
}
