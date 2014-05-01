/// <reference path="../References.d.ts"/>

module dsa.util {

    export function clearArray(array:any[]) {
        while (array.length > 0) {
            array.pop();
        }
    }

}