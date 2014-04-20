/// <reference path="../References.d.ts"/>

module dsa.Exceptions {

    class BaseException {
        error: Error;
        name: string;

        constructor(message?: string) {
            this.error = new Error(message);
            this.error.name = this.name;
        }
    }

    class IllegalArgument extends BaseException {
        constructor(message?: string) {
            this.name = "IllegalArgument";
            super(message);
        }
    }

    class NullPointer extends BaseException {
        constructor(message?: string) {
            this.name = "NullPointer";
            super(message);
        }
    }

    export class Preconditions {
        static checkNotNull(arugment: any, message: string): void {
            if (arugment) {
                throw new dsa.Exceptions.NullPointer(message || "argument is null.");
            }
        }

        static checkArgument(condition: boolean, message?: string):void {
            if (condition) {
                throw new dsa.Exceptions.IllegalArgument(message);
            }
        }
    }

    //TODO: consider exceptions in guaava? (nullArg, index out of bounds, etc).

    //TODO: doc for.. throw new IllegalArgument("message").error;
}