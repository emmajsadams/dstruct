/// <reference path="../References.d.ts"/>

module tsds {

    // TODO: move this somewhere
    export class Validator {

        static null(element: any): void {
            if (element) {
                throw new tsds.Exceptions.NullPointer("argument is null.");
            }
        }

        static lessThanZero(num: number):void {
            if (num < 0) {
                throw new tsds.Exceptions.IllegalArgument("argument is less than zero.");
            }
        }
    }

}