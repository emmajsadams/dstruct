/// <reference path="../../References.d.ts"/>

//TODO: doc for.. throw new IllegalArgument("message").error;
module dsa.error {

    export function checkNotNull(argument:any, message?:string):void {
        if (argument === null || argument === undefined) {
            throw new dsa.error.NullPointer(message || "argument is null.").error;
        }
    }

    export function checkArgument(condition:boolean, message?:string):void {
        if (condition) {
            throw new dsa.error.IllegalArgument(message).error;
        }
    }

    export function checkIndex(index:number, size:number, message?:string):void {
        if (index < 0 || index >= size) {
            throw new dsa.error.IndexOutOfBounds(message).error;
        }
    }

    export function checkIndexRange(startIndex:number, endIndex:number, size:number, message?:string):void {
        if (startIndex > endIndex || startIndex < 0 || endIndex >= size) {
            throw new dsa.error.IndexOutOfBounds(message).error;
        }
    }

}

