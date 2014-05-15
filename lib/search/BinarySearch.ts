/*
module dsa.search {

    export function BinarySearch<E>(
        list: dsa.structs.List<E>,
        value: E,
        comparator: dsa.structs.Comparator<E> = dsa.structs.DefaultComparator) {
        var minIndex = 0;
        var maxIndex = list.size() - 1;
        var midIndex: number;
        var midValue: E;

        //Check for sorted condition?
        // Return two's compliment https://pay.reddit.com/r/javascript/comments/1fx4od/searching_javascript_arrays_with_a_binary_search/caeo5is
        while (minIndex <= maxIndex) {
            midIndex = (minIndex + maxIndex)/2 | 0;
            midValue = list.get(midIndex);

            if (comparator(midValue, value) < 0) {
                minIndex = midIndex + 1;
            } else if (comparator(midValue, value) > 0) {
                maxIndex = midIndex - 1;
            } else {
                return midIndex;
            }
        }

        return ~maxIndex;
    }

}
    */