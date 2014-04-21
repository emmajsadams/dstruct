/// <reference path="../References.d.ts"/>

//TODO: doc for.. throw new IllegalArgument("message").error;
module dsa.Preconditions {

    export function checkNotNull(argument:any, message?:string):void {
        if (argument === null || argument === undefined) {
            throw new dsa.Exceptions.NullPointer(message || "argument is null.").error;
        }
    }

    export function checkArgument(condition:boolean, message?:string):void {
        if (condition) {
            throw new dsa.Exceptions.IllegalArgument(message).error;
        }
    }

    export function checkIndex(index:number, size:number, message?:string):void {
        if (index < 0 || index >= size) {
            throw new dsa.Exceptions.IndexOutOfBounds(message).error;
        }
    }

    export function checkIndexRange(startIndex:number, endIndex:number, size:number, message?:string):void {
        if (startIndex > endIndex || startIndex < 0 || endIndex >= size) {
            throw new dsa.Exceptions.IndexOutOfBounds(message).error;
        }
    }

}

module dsa.Exceptions {

    export class BaseException {
        error:Error;
        name:string;

        constructor(message?:string) {
            this.error = new Error(message);
            this.error.name = this.name + "Exception"; //TODO: adding exception necesary?
        }
    }

    export class IllegalArgument extends BaseException {
        constructor(message?:string) {
            this.name = "IllegalArgument";
            super(message);
        }
    }

    export class IllegalState extends BaseException {
        constructor(message?:string) {
            this.name = "IllegalState";
            super(message);
        }
    }

    export class NullPointer extends BaseException {
        constructor(message?:string) {
            this.name = "NullPointer";
            super(message);
        }
    }

    export class IndexOutOfBounds extends BaseException {
        constructor(message?:string) {
            this.name = "IndexOutOfBounds";
            super(message);
        }
    }

}