/// <reference path="../../../References.d.ts"/>

module dsa.structs {

    export function mapEquals<K extends Object, V extends Object>(
        map:Map<K, V>,
        otherMap:Map<K, V>):boolean {
        return iterableEquals<K>(map, otherMap, (mapIterator) => {
            var mapKey = <any>mapIterator.next(); //TODO: remove any
            var mapValue = <any>map.get(mapKey.value);
            var otherMapValue = <any>otherMap.get(mapKey.value);

            return mapValue.value.equals(otherMapValue.value);
        })
    }

    export function mapForEach<K extends Object, V extends Object>(map:Map<K, V>, callback:ForEachMapCallback<K, V>):void {
        dsa.error.checkNotNull(map);
        dsa.error.checkNotNull(callback);

        if (map.size() > 0) {
            var keys = map.keys();
            var values = map.values();
            var key: IteratorReturn<K>;
            do {
                key = keys.next();
                var value = values.next();
                callback(<any>key.value, <any>value.value); //TODO: remove any,
            } while (!key.done);
        }
    }

}