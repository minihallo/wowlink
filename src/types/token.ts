export interface Token {
    price: number;
    timestamp: string;
}

export interface TokenDocument {
    _id: string;
    kr: Token[];
}