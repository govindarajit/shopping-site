export class CartItem {
    _id;
    total;
    constructor(public productId: string,
        public name: string,
        public unitPrice: number,
        public quantity: number) { }
}
