declare module dsa.structs {

    export interface Iterable {
        forEach(callback: (element:any) => void): void;
        size(): number;
        __iterator__(): any;
    }

}