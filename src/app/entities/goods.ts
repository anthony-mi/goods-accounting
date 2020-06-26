export class Goods {
    constructor(
        public id: number,
        public name: string,
        public count: number,
        public purchasePrice: number,
        public salePrice: number,
        public countOfSold: number) { }
}
