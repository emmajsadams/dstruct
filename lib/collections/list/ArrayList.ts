/// <reference path="../../../References.d.ts"/> 


module dsa.structs {

    class ArrayListIterator<E> implements Iterator<E> {
        private index = 0;

        constructor(private array:E[]) {}

        next():E {
            if (this.index >= this.array.length) {
                throw StopIteration;
            }

            var element = this.array[this.index];
            this.index++;
            return element;
        }
    }

    export class ArrayList<E> implements List<E> {
        private array:E[];

        constructor(private comparator:Comparator<E> = DefaultComparator, initialCapacity?:number) {
            this.array = new Array(initialCapacity || 0);
        }

        __iterator__(): Iterator<E> {
            return new ArrayListIterator(this.array);
        }

        add(element:E):boolean {
            this.addAtIndex(0, element);
            return true;
        }

        addAtIndex(index:number, element:E):void {
            dsa.error.checkNotNull(element);

            this.array.splice(index, 0, element);
        }

        clear():void {
            util.clearArray(this.array);
        }

        removeAtIndex(index:number):E {
            dsa.error.checkNotNull(index);
            dsa.error.checkIndex(index, this.size());

            var element = this.get(index);
            this.array.splice(index, 1);
            return element;
        }

        remove(element:E):boolean {
            dsa.error.checkNotNull(element);

            var index = this.indexOf(element);
            if (index >= 0) {
                this.array.splice(index, 1);
                return true;
            } else {
                return false;
            }
        }

        equals(collection:Collection<E>):boolean {
            return genericEquals(this, collection);
        }

        forEach(callback:ForEachCollectionCallback<E>):void {
            genericForEach(this, callback);
        }

        get(index:number):E {
            dsa.error.checkNotNull(index);
            dsa.error.checkIndex(index, this.size());

            return this.array[index];
        }

        has(element:E):boolean {
            return this.indexOf(element) >= 0;
        }

        indexOf(value:E):number {
            dsa.error.checkNotNull(value);

            var index = 0;
            for (var element in this) {
                if (this.comparator(element, value) === 0) {
                    return index;
                }
                index++;
            }
            return -1;
        }

        set(index:number, element:E):E {
            dsa.error.checkNotNull(element);

            var currentValue = this.get(index);
            this.array[index] = element;

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