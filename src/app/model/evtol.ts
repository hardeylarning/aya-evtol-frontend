export class Evtol {
    constructor(
        public _id: string,
        public serialNumber: number,
        public model: string,
        public weight: number,
        public batteryCapacity: number,
        public state: string,
        public medicines: []
    ){}
}
