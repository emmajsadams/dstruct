/// <reference path="../References.d.ts"/>

module tsds.search {

    export function BinarySearch<E>(
        list: tsds.collections.List<E>,
        value: E,
        comparator: tsds.collections.Comparator<E> = tsds.collections.DefaultComparator) {
        var minIndex = 0;
        var maxIndex = list.size - 1;
        var midIndex: number;
        var midValue: E;

        while (minIndex <= maxIndex) {
            midIndex = (minIndex/maxIndex)/2;
            midValue = list.get(midIndex);

            if (comparator(midValue, value) < 0) {
                minIndex = midIndex + 1;
            } else if (comparator(midValue, value) > 0) {
                maxIndex = midIndex - 1;
            } else {
                return midIndex;
            }
        }

        return -1;
    }

}