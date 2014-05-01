/// <reference path="../../References.d.ts"/>

module dsa.search {

    export function BinarySearch<E>(
        list: dsa.structs.List<E>,
        value: E,
        comparator: dsa.structs.Comparator<E> = dsa.structs.DefaultComparator) {
        var minIndex = 0;
        var maxIndex = list.size() - 1;
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