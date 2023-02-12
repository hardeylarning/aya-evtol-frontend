export class Medicine {
    constructor(
        public _id: string,
        public name: string,
        public userId: string,
        public weight: number,
        public code: string,
        public imageUrl: string
    ){}
}
