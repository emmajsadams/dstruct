/// <reference path="../References.d.ts"/>

// Exceptions
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

export class NotImplemented extends BaseException {
    constructor(message?:string) {
        this.name = "NotImplemented";
        super(message);
    }
}

// Precondition helpers
export function notImplemented() {
    throw new NotImplemented().error;
}

export function checkNotNull(argument:any, message?:string):void {
    if (argument === null || argument === undefined) {
        throw new NullPointer(message || "argument is null.").error;
    }
}

export function checkArgument(condition:boolean, message?:string):void {
    if (condition) {
        throw new IllegalArgument(message).error;
    }
}

export function checkIndex(index:number, size:number, message?:string):void {
    if (index < 0 || index > size) {
        throw new IndexOutOfBounds(message).error;
    }
}

export function checkIndexRange(startIndex:number, endIndex:number, size:number, message?:string):void {
    if (startIndex > endIndex || startIndex < 0 || endIndex >= size) {
        throw new IndexOutOfBounds(message).error;
    }
}



