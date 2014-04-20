/// <reference path="../References.d.ts"/>

module tsds.Exceptions {

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

    //TODO: consider exceptions in guaava? (nullArg, index out of bounds, etc).

    //TODO: doc for.. throw new IllegalArgument("message").error;
}