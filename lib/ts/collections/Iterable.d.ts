declare module dsa.structs {

    export interface Iterable {
        __iterator__(): any;
        size(): number;
    }

}