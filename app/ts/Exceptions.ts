/// <reference path="./References.d.ts"/>

module tsds.Exceptions {

    export interface Exception {
        name: string;
        message: string;
        error: Error;
    }

    // TODO: Abstract? Private?
    export class Base implements Exception {
        name: string;
        message: string;
        error: Error;

        constructor(message: string, name: string) {
            this.message = message;
            this.error = new Error();
            this.name = name;
        }
    }

    // TODO: null, undefined, false? which is this? maybe falsypointer?
    export class NullPointer extends Base {
        constructor(message: string) {
            super(message, "NullPointerException");
        }
    }

    export class IllegalArgument extends Base {
        constructor(message: string) {
            super(message, "IllegalArgumentException");
        }
    }

}