export class User {
    constructor(
        public _id: string,
        public fullname: string,
        public role: string,
        public email: string,
        public password: string
    ){}
}
