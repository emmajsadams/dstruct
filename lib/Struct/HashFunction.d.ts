declare module dsa.structs {

    export interface HashFunction<E> {
        (object: E): string;
    }

}