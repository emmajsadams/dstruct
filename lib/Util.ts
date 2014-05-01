/// <reference path="../References.d.ts"/>
CollectionHelpers
module dsa.util {

    export function clearArray(array:any[]) {
        while (array.length > 0) {
            array.pop();
        }
    }

}