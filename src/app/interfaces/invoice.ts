export interface Invoice {
    id?: number;
    number: number;
    net: number;
    tax: number;
    total?: number;
}
