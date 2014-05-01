/// <reference path="../../References.d.ts"/>

module dsa.error {

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