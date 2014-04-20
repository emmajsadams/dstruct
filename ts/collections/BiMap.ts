/// <reference path="../../References.d.ts"/>

module tsds.collections {

    export interface IBiMap<K, V> extends Map<K ,V> {
        inverse(): IBiMap<V, K>
    }

    export class HashBiMap<K, V> implements IBiMap<K, V>{
        get size(): number {
            return this.map.size;
        }

        constructor(private map: Map<K, V> = <any>new Map<K, V>(),
                    private inverseMap: Map<V, K> = <any>new Map<V, K>()) {
        }

        has(key: K): boolean {
            return this.map.has(key);
        }

        get(key: K): V {
            return this.map.get(key);
        }

        set(key: K, value: V): void {
            if (this.inverseMap.has(value)) {
                throw new tsds.Exceptions.IllegalArgument("value already bound to key");
            }

            this.map.set(key, value);
            this.inverseMap.set(value, key);
        }

        delete(key: K):  boolean{
            var value = this.map.get(key);
            this.inverseMap.delete(value);
            return this.map.delete(key);
        }

        // TODO: return map, or BiMap?? Guava returns BiMap
        inverse(): IBiMap<V, K> {
            // TODO: return a copy, or immutable/protected?
            // user should not be able to modify inverseMap
            return new HashBiMap(this.map, this.inverseMap);
        }

        clear(): void {
            this.map.clear();
            this.inverseMap.clear();
        }

        forEach(callback: forEachMapCallback<K, V>, thisArg: any): void {

        }

        keys(): Iterator<K> {
            return <any>{};
        }

        values(): Iterator<V> {
            return <any>{};
        }
    }
}