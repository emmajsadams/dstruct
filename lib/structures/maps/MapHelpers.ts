import Interfaces = require("../../Interfaces");
import Error = require("../../Error");

export function equals<K extends Interfaces.IBaseObject, V extends Interfaces.IBaseObject>(map: Interfaces.IMap<K, V>, otherMap: Interfaces.IMap<K, V>): boolean {
  return false; //TODO! implement
  /*
   return iterableEquals<K>(map, otherMap, (mapIterator) => {
   var mapKey = <any>mapIterator.next(); //TODO: remove any
   var mapValue = <any>map.get(mapKey.value);
   var otherMapValue = <any>otherMap.get(mapKey.value);

   return mapValue.value.equals(otherMapValue.value);
   })*/
}

export function forEach<K extends Interfaces.IBaseObject, V extends Interfaces.IBaseObject>(map: Interfaces.IMap<K, V>, callback: Interfaces.IForEachMapCallback<K, V>): void {
  Error.checkNotNull(map);
  Error.checkNotNull(callback);

  if (map.size() > 0) {
    var keys = map.keys();
    var values = map.values();
    var key: Interfaces.IIteratorReturn<K>;
    do {
      key = keys.next();
      var value = values.next();
      callback(value.value, key.value);
    } while (!key.done);
  }
}
