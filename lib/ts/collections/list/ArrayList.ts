/// <reference path="../../../References.d.ts"/>

module dsa.collections {

    export class ArrayList<E> implements List<E> {
        private array:E[];

        constructor(//TODO: is comparator necessary? might be for inedxOF
                    private comparator?:Comparator<E>, size?:number) {
            this.array = new Array(size || 0);
        }

        add(value:E):void {
            Preconditions.checkNotNull(value);

            this.array.push(value);
        }

        clear():void {
            util.clearArray(this.array);
        }

        delete(value:E):boolean {
            Preconditions.checkNotNull(value);

            var index = this.indexOf(value);
            if (index >= 0) {
                this.array.splice(index, 1);
                return true;
            } else {
                return false;
            }
        }

        get(index:number):E {
            Preconditions.checkNotNull(index);
            Preconditions.checkIndex(index, this.size());

            return this.array[index];
        }

        has(value:E):boolean {
            return this.indexOf(value) >= 0;
        }

        indexOf(value:E):number {
            Preconditions.checkNotNull(value);

            // TODO: consider if this will work with objects?
            return this.array.indexOf(value);
        }

        set(index:number, value:E):E {
            Preconditions.checkNotNull(value);

            var currentValue = this.get(index);
            this.array[index] = value;

            return currentValue;
        }

        size():number {
            return this.array.length;
        }

        toArray():E[] {
            //TODO: immutable?
            return this.array;
        }

        isEmpty():boolean {
            return this.size() > 0;
        }
    }

}